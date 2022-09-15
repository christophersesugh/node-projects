import Task from "../models/tasks.js";
import asyncWrapper from "../middleware/async-wrapper.js";

// get all tasks
export const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

// create task
export const createTask = asyncWrapper(async (req, res) => {
  const data = req.body;
  const task = await Task.create(data);
  res.status(201).json({ task });
});

// get single task
export const getTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findOne({ _id: id });
  if (!task) {
    return res.status(404).json({ message: `No task with id ${id}` });
  }
  res.status(200).json({ task });
});

// update task
export const updateTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const task = await Task.findOneAndUpdate({ _id: id }, data, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return res.status(404).json({ message: `No task with id ${id}` });
  }
  res.status(200).json({ task });
});

// delete task
export const deleteTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findOneAndDelete({ _id: id });
  if (!task) {
    return res.status(404).json({ message: `No task with id ${id}` });
  }
  res.status(200).json({ task });
});
