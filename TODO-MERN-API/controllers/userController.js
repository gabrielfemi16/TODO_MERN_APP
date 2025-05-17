const Task = require("../models/taskModel");
const mongoose = require("mongoose");

const getTask = async (req, res) => {
  try {
    const { userId } = req.params;
    const tasks = await Task.find({ userId: userId }).sort({
      createdAt: -1,
    });

    if (tasks.length === 0) {
      return res.status(404).json({ message: "No task found" });
    }
    res.status(200).json({ tasks });
  } catch (err) {
    console.log(err);
  }
};

const getSingleTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(404).json({ message: "Invalid task ID" });
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching task" });
  }
};

const createTask = async (req, res) => {
  try {
    const { taskName, taskDate } = req.body;
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ message: "invalid user id" });
    }

    if (!taskName || !taskDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTask = new Task({
      taskName: taskName,
      taskDate: taskDate,
      userId: userId,
    });

    const savedTask = await newTask.save();
    console.log(savedTask);
    res.status(200).json({ message: "Task created succefully", task: newTask });
  } catch (err) {
    console.log(err);
  }
};

const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { taskName, taskDate } = req.body;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(404).json({ message: "invalid task id" });
    }

    if (!taskName || !taskDate) {
      return res.status(404).json({ message: "All fields are required" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { taskName: taskName, taskDate: taskDate },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (err) {
    console.log(err);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(404).json({ message: "invalid task id" });
    }

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.log(err);
  }
};

const updateUser = (req, res) => {
  res.send("userInfo updated");
};

const toggleTaskDone = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.done = !task.done; // change to true or false depending on the existing value
    await task.save();
    res.status(200).json({ message: "Task updated", task });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error toggling task done status" });
  }
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  updateUser,
  getTask,
  getSingleTask,
  toggleTaskDone,
};
