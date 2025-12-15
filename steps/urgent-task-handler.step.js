export default {
    config: {
        name: "UrgentTaskHandler",
        type: "event",
        subscribes: ["task.urgent"],
        emits: ["task.completed"]
    },

    handler: async (event, { emit }) => {
        const { message, priority } = event;

        console.log(`🚨 URGENT HANDLER: Processing high-priority task`);
        console.log(`   Message: "${message}"`);
        console.log(`   Priority: ${priority}`);

        // Simulate immediate processing (no delay for urgent tasks)
        await emit({
            topic: "task.completed",
            data: {
                message,
                priority,
                handledBy: "urgent-handler",
                handledAt: new Date().toISOString(),
                processingTime: "immediate"
            }
        });
    }
};
