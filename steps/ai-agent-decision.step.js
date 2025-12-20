import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

/**
 * Clean and parse JSON response from Gemini
 * Handles common issues like:
 * - Text before/after JSON (e.g., "Here is the JSON: {...}")
 * - Markdown code blocks
 * - Trailing commas
 * - Newlines in strings
 * - Unquoted property names
 */
function parseGeminiJSON(text) {
    let cleaned = text.trim();

    // FIRST: Try to extract just the JSON object from any surrounding text
    // This handles cases like "Here is the JSON response: { ... }"
    const jsonObjectMatch = cleaned.match(/\{[\s\S]*\}/);
    if (jsonObjectMatch) {
        cleaned = jsonObjectMatch[0];
    } else {
        // If no JSON object found, try removing code blocks first
        if (cleaned.includes("```")) {
            cleaned = cleaned.replace(/```(?:json)?\s*/g, "").replace(/```/g, "");
            const retryMatch = cleaned.match(/\{[\s\S]*\}/);
            if (retryMatch) {
                cleaned = retryMatch[0];
            }
        }
    }

    cleaned = cleaned.trim();

    // Fix trailing commas in arrays and objects (common LLM issue)
    cleaned = cleaned.replace(/,\s*([}\]])/g, "$1");

    // Fix unquoted property names
    cleaned = cleaned.replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":');

    // Fix newlines inside string values (causes "Unterminated string" errors)
    // This iteratively fixes newlines within quoted strings
    let prevCleaned;
    do {
        prevCleaned = cleaned;
        cleaned = cleaned.replace(/"([^"\n]*)\n([^"]*)"/g, '"$1 $2"');
    } while (cleaned !== prevCleaned);

    return JSON.parse(cleaned);
}

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

            // Define the expected response schema
            const responseSchema = {
                type: "object",
                properties: {
                    decision: { type: "string", enum: ["urgent", "normal"] },
                    priority: { type: "string", enum: ["high", "normal"] },
                    reason: { type: "string" },
                    confidence: { type: "string", enum: ["high", "medium", "low"] },
                    keywords_detected: { type: "array", items: { type: "string" } }
                },
                required: ["decision", "priority", "reason", "confidence", "keywords_detected"]
            };

            const model = genAI.getGenerativeModel({
                model: modelName,
                generationConfig: {
                    temperature: 0,
                    maxOutputTokens: 256,
                    // Force JSON output mode with schema - guarantees valid JSON from Gemini
                    responseMimeType: "application/json",
                    responseSchema: responseSchema,
                }
            });

            const prompt = `${SYSTEM_PROMPT}\n\nAnalyze this task message and classify its priority:\n\n"${message}"`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text().trim();

            // Debug: log raw response (first 200 chars) to help diagnose issues
            console.log(`   📦 Raw response: ${text.substring(0, 200)}${text.length > 200 ? '...' : ''}`);

            // Parse JSON response (with cleaning for common LLM output issues)
            aiResult = parseGeminiJSON(text);

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
