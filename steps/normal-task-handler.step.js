export default {
    config: {
        name: "NormalTaskHandler",
        type: "event",
        description: "Handles standard priority tasks",
        subscribes: ["task.normal"],
        emits: ["task.completed"],
        flows: ["task-prioritization"]
    },

    handler: async (event, { emit }) => {
        const { message, priority, reason, confidence, keywords_detected, agent } = event;

        console.log(`\n📋 ═══════════════════════════════════════════`);
        console.log(`   NORMAL TASK PROCESSING`);
        console.log(`═══════════════════════════════════════════════`);
        console.log(`   📋 Step: NormalTaskHandler`);
        console.log(`   🎯 Event: task.normal`);
        console.log(`   📝 Message: "${message}"`);
        console.log(`   🟢 Priority: ${priority}`);
        console.log(`   💭 AI Reason: ${reason}`);
        console.log(`   📊 Confidence: ${confidence}`);
        console.log(`   ⏳ Processing: STANDARD`);

        // Simulate standard processing
        await emit({
            topic: "task.completed",
            data: {
                message,
                priority,
                reason,
                confidence,
                keywords_detected,
                agent,
                handledBy: "normal-handler",
                handledAt: new Date().toISOString(),
                processingTime: "standard"
            }
        });
    }
};
