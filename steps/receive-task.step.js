export default {
  config: {
    name: "ReceiveTask",
    type: "api",
    description: "API endpoint to receive task requests",
    path: "/task",
    method: "POST",
    emits: ["task.received"],
    flows: ["task-prioritization"]
  },

  handler: async (req, { emit }) => {
    const message = req.body?.message || "no-message";
    const timestamp = new Date().toISOString();

    console.log(`\n📥 ═══════════════════════════════════════════`);
    console.log(`   TASK RECEIVED`);
    console.log(`═══════════════════════════════════════════════`);
    console.log(`   📋 Step: ReceiveTask`);
    console.log(`   🌐 Type: API (POST /task)`);
    console.log(`   📝 Message: "${message}"`);
    console.log(`   ⏰ Time: ${timestamp}`);

    await emit({
      topic: "task.received",
      data: { message, receivedAt: timestamp }
    });

    console.log(`   ✅ Emitted: task.received`);
    console.log(`═══════════════════════════════════════════════\n`);

    return {
      status: 200,
      body: {
        status: "Task received",
        message,
        timestamp
      }
    };
  }
};
