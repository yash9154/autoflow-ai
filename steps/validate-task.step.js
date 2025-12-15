export default {
  config: {
    name: "ValidateTask",
    type: "event",
    subscribes: ["task.received"],
    emits: ["task.validated"]
  },

  handler: async (event, { emit }) => {
    const message = event.data?.message;

    console.log("✅ ValidateTask received message:", message);

    // ❗ NO throw, NO validation for now
    await emit({
      topic: "task.validated",
      data: { message }
    });
  }
};
