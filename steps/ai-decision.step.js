export default {
    config: {
        name: "AIDecision",
        type: "event",
        subscribes: ["task.validated"],
        emits: ["task.urgent", "task.normal"]
    },

    handler: async (event, { emit }) => {
        const message = (event.message || "").toLowerCase();

        const isUrgent =
            message.includes("urgent") ||
            message.includes("down") ||
            message.includes("error");

        console.log(`🤖 AI Decision: "${message}" → ${isUrgent ? "URGENT" : "NORMAL"}`);

        await emit({
            topic: isUrgent ? "task.urgent" : "task.normal",
            data: {
                message: event.message,
                priority: isUrgent ? "high" : "normal",
                decidedAt: new Date().toISOString()
            }
        });
    }
};
