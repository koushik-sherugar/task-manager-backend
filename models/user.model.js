const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    default: "To Do",
  },
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  tasks: [taskSchema],
});

// Export the model
module.exports = mongoose.model("User", userSchema);
