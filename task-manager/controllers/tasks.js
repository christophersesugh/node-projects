import Task from "../models/tasks.js";

// get all tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create task
export const createTask = async (req, res) => {
  const data = req.body;
  try {
    const task = await Task.create(data);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get single task
export const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ _id: id });
    if (!task) {
      return res.status(404).json({ message: `No task with id ${id}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update task
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const task = await Task.findOneAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ message: `No task with id ${id}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete task
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: id });
    if (!task) {
      return res.status(404).json({ message: `No task with id ${id}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
