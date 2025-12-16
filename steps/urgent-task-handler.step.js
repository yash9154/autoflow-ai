export default {
    config: {
        name: "UrgentTaskHandler",
        type: "event",
        description: "Handles high-priority urgent tasks",
        subscribes: ["task.urgent"],
        emits: ["task.completed"],
        flows: ["task-prioritization"]
    },

    handler: async (event, { emit }) => {
        const { message, priority, reason, confidence, keywords_detected, agent } = event;

        console.log(`\n🚨 ═══════════════════════════════════════════`);
        console.log(`   URGENT TASK PROCESSING`);
        console.log(`═══════════════════════════════════════════════`);
        console.log(`   📋 Step: UrgentTaskHandler`);
        console.log(`   🎯 Event: task.urgent`);
        console.log(`   📝 Message: "${message}"`);
        console.log(`   🔴 Priority: ${priority}`);
        console.log(`   💭 AI Reason: ${reason}`);
        console.log(`   📊 Confidence: ${confidence}`);
        console.log(`   ⚡ Processing: IMMEDIATE`);

        // Simulate immediate processing (no delay for urgent tasks)
        await emit({
            topic: "task.completed",
            data: {
                message,
                priority,
                reason,
                confidence,
                keywords_detected,
                agent,
                handledBy: "urgent-handler",
                handledAt: new Date().toISOString(),
                processingTime: "immediate"
            }
        });
    }
};
