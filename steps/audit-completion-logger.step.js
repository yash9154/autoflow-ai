/**
 * AuditCompletionLogger - Event Step
 * Logs final audit completion for observability.
 */

export default {
    config: {
        name: "AuditCompletionLogger",
        type: "event",
        description: "Logs completion of system audits",
        subscribes: ["system.audit.completed"],
        emits: [],
        flows: ["system-audit"]
    },

    handler: async (event, { logger }) => {
        const { triggeredAt, processedAt, results, status } = event;

        console.log(`\n✅ ═══════════════════════════════════════════`);
        console.log(`   AUDIT CYCLE COMPLETE`);
        console.log(`═══════════════════════════════════════════════`);
        console.log(`   📋 Step: AuditCompletionLogger`);
        console.log(`   🎯 Event: system.audit.completed`);
        console.log(`   📊 Status: ${status.toUpperCase()}`);
        console.log(`   ⏱️  Duration: ${new Date(processedAt) - new Date(triggeredAt)}ms`);
        console.log(`   🏥 Health: ${results.systemHealth}`);
        console.log(`═══════════════════════════════════════════════\n`);
    }
};
