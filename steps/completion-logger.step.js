export default {
    config: {
        name: "CompletionLogger",
        type: "event",
        subscribes: ["task.completed"],
        emits: []
    },

    handler: async (event) => {
        const { message, priority, handledBy, handledAt, processingTime } = event;

        console.log(`\n✅ ═══════════════════════════════════════════`);
        console.log(`   WORKFLOW COMPLETED`);
        console.log(`═══════════════════════════════════════════════`);
        console.log(`   📝 Message: "${message}"`);
        console.log(`   🎯 Priority: ${priority}`);
        console.log(`   🔧 Handled By: ${handledBy}`);
        console.log(`   ⏱️  Processing: ${processingTime}`);
        console.log(`   🕐 Completed At: ${handledAt}`);
        console.log(`═══════════════════════════════════════════════\n`);
    }
};
