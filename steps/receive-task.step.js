export default {
  config: {
    name: "ReceiveTask",
    type: "api",
    path: "/task",
    method: "POST",
    emits: ["task.received"]
  },

  handler: async (req, { emit }) => {
    const message = req.body?.message || "no-message";

    await emit({
      topic: "task.received",
      data: { message }
    });

    return {
      body: {
        status: "Task received",
        message
      }
    };
  }
};
