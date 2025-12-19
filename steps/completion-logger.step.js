export default {
    config: {
        name: "CompletionLogger",
        type: "event",
        subscribes: ["task.completed"],
        emits: []
    },

    handler: async (event) => {
        const { message, priority, reason, confidence, keywords_detected, agent, handledBy, handledAt, processingTime } = event;

        console.log(`\n✅ ═══════════════════════════════════════════`);
        console.log(`   WORKFLOW COMPLETED`);
        console.log(`═══════════════════════════════════════════════`);
        console.log(`   📝 Message: "${message}"`);
        console.log(`   🎯 Priority: ${priority}`);
        console.log(`   🤖 AI Agent: ${agent || "N/A"}`);
        console.log(`   💭 AI Reason: ${reason || "N/A"}`);
        console.log(`   📊 Confidence: ${confidence || "N/A"}`);
        console.log(`   🔑 Keywords: [${(keywords_detected || []).join(", ")}]`);
        console.log(`   🔧 Handled By: ${handledBy}`);
        console.log(`   ⏱️  Processing: ${processingTime}`);
        console.log(`   🕐 Completed At: ${handledAt}`);
        console.log(`═══════════════════════════════════════════════\n`);
    }
};
