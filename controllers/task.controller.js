const User = require("../models/user.model");

// create the task
exports.createTask = async (req, res) => {
  try {
    const { userId, title, description, createdAt } = req.body;
    const user = await User.findOne({ userId });

    if (user) {
      const newTask = {
        title,
        description,
        status: "To Do",
        createdAt,
      };
      user.tasks.push(newTask);
      await user.save();
      res.status(201).json(newTask);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all the tasks
exports.getTasks = async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await User.findOne({ userId });
    if (user) {
      res.status(200).json(user.tasks);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update the task

exports.updateTask = async (req, res) => {
  try {
    const { userId, title, description, status } = req.body;
    const { taskId } = req.params;

    // Find the user by userId
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the task by its ID within the user's tasks array
    const task = user.tasks.id(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update the task fields
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    // Save the updated user document
    await user.save();

    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: error.message });
  }
};

// delete the task
exports.deleteTask = async (req, res) => {
  try {
    const { userId } = req.body;
    const { taskId } = req.params;
    const user = await User.findOne({ userId });

    if (user) {
      user.tasks.id(taskId).remove();
      await user.save();
      res.status(200).json({ message: "Task deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
