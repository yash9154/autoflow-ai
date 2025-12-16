/**
 * SystemAuditScheduler - Cron Step
 * Demonstrates Motia's scheduling capabilities beyond HTTP APIs.
 * Runs every 2 minutes and emits system.audit.run event.
 */

export const config = {
    name: "SystemAuditScheduler",
    type: "cron",
    description: "Scheduled system audit - runs every 2 minutes",
    cron: "*/2 * * * *",
    emits: [
        { topic: "system.audit.run", label: "Trigger System Audit" }
    ],
    flows: ["system-audit"]
};

export const handler = async ({ emit, logger }) => {
    const timestamp = new Date().toISOString();

    console.log(`\n🕐 ═══════════════════════════════════════════`);
    console.log(`   SCHEDULED AUDIT TRIGGERED`);
    console.log(`═══════════════════════════════════════════════`);
    console.log(`   ⏰ Time: ${timestamp}`);
    console.log(`   📋 Step: SystemAuditScheduler`);
    console.log(`   🔄 Type: Cron (*/2 * * * *)`);

    // Emit audit event
    await emit({
        topic: "system.audit.run",
        data: {
            triggeredAt: timestamp,
            source: "scheduler",
            auditType: "system-health"
        }
    });

    console.log(`   ✅ Emitted: system.audit.run`);
    console.log(`═══════════════════════════════════════════════\n`);
};
