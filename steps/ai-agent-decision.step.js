import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `You are a task priority classifier for an enterprise workflow system.

Your job is to analyze incoming task messages and determine their priority level.

CLASSIFICATION RULES:
- URGENT: System failures, outages, security issues, production problems, critical errors, time-sensitive emergencies
- NORMAL: Regular tasks, reviews, reports, meetings, general requests, non-critical items

You must respond with ONLY a valid JSON object (no markdown, no code blocks) in this exact format:
{
  "decision": "urgent" or "normal",
  "priority": "high" or "normal",
  "reason": "brief explanation of why this priority was chosen",
  "confidence": "high", "medium", or "low",
  "keywords_detected": ["array", "of", "keywords", "that", "influenced", "decision"]
}

Be conservative: if unsure, classify as "normal".
Never hallucinate or make up information.`;

export default {
    config: {
        name: "AIAgentDecision",
        type: "event",
        description: "AI Agent that classifies task priority using Gemini LLM",
        subscribes: ["task.validated"],
        emits: [
            { topic: "task.urgent", label: "Urgent Task", conditional: true },
            { topic: "task.normal", label: "Normal Task", conditional: true }
        ]
    },

    handler: async (event, { emit, logger }) => {
        const message = event.message || "no-message";

        console.log(`\n🤖 AI AGENT: Analyzing task...`);
        console.log(`   Input: "${message}"`);

        let aiResult;

        try {
            // Check for API key
            if (!process.env.GEMINI_API_KEY) {
                throw new Error("GEMINI_API_KEY environment variable not set");
            }

            // Call Gemini API
            const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";
            console.log(`   Using model: ${modelName}`);

            const model = genAI.getGenerativeModel({
                model: modelName,
                generationConfig: {
                    temperature: 0,
                    maxOutputTokens: 256,
                }
            });

            const prompt = `${SYSTEM_PROMPT}\n\nAnalyze this task message and classify its priority:\n\n"${message}"`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text().trim();

            // Parse JSON response
            aiResult = JSON.parse(text);

            console.log(`   🧠 AI Decision: ${aiResult.decision.toUpperCase()}`);
            console.log(`   📝 Reason: ${aiResult.reason}`);
            console.log(`   🎯 Confidence: ${aiResult.confidence}`);
            console.log(`   🔑 Keywords: [${aiResult.keywords_detected.join(", ")}]`);

        } catch (error) {
            // Fallback to "normal" priority if AI fails
            console.log(`   ⚠️ AI Error: ${error.message}`);
            console.log(`   ↪️ Falling back to NORMAL priority`);

            aiResult = {
                decision: "normal",
                priority: "normal",
                reason: "AI unavailable - defaulting to normal priority",
                confidence: "low",
                keywords_detected: []
            };
        }

        // Emit appropriate event with AI metadata
        const eventData = {
            message,
            priority: aiResult.priority,
            decision: aiResult.decision,
            reason: aiResult.reason,
            confidence: aiResult.confidence,
            keywords_detected: aiResult.keywords_detected,
            agent: "AIAgentDecision",
            decidedAt: new Date().toISOString()
        };

        await emit({
            topic: aiResult.decision === "urgent" ? "task.urgent" : "task.normal",
            data: eventData
        });

        console.log(`   ✅ Emitted: task.${aiResult.decision}\n`);
    }
};
