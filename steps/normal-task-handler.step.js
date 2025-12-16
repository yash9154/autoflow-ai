export default {
    config: {
        name: "NormalTaskHandler",
        type: "event",
        subscribes: ["task.normal"],
        emits: ["task.completed"]
    },

    handler: async (event, { emit }) => {
        const { message, priority, reason, confidence, keywords_detected, agent } = event;

        console.log(`📋 NORMAL HANDLER: Processing standard task`);
        console.log(`   Message: "${message}"`);
        console.log(`   Priority: ${priority}`);
        console.log(`   AI Reason: ${reason}`);

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
