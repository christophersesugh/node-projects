import mongoose from "mongoose";

const TaskSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Invalid task name!"],
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Task", TaskSchema);
