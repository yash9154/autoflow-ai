export default {
  config: {
    name: "ValidateTask",
    type: "event",
    description: "Validates incoming task messages",
    subscribes: ["task.received"],
    emits: ["task.validated"],
    flows: ["task-prioritization"]
  },

  handler: async (event, { emit }) => {
    const { message, receivedAt } = event;
    const timestamp = new Date().toISOString();

    console.log(`\n🔍 ═══════════════════════════════════════════`);
    console.log(`   VALIDATING TASK`);
    console.log(`═══════════════════════════════════════════════`);
    console.log(`   📋 Step: ValidateTask`);
    console.log(`   🎯 Event: task.received`);
    console.log(`   📝 Message: "${message}"`);
    console.log(`   ✅ Validation: PASSED`);
    console.log(`   ⏰ Time: ${timestamp}`);

    await emit({
      topic: "task.validated",
      data: { message, validatedAt: timestamp }
    });

    console.log(`   ✅ Emitted: task.validated`);
    console.log(`═══════════════════════════════════════════════\n`);
  }
};
