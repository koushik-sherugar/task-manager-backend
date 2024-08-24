const express = require("express");
const router = express.Router();

// Require the controllers

const task_controller = require("../controllers/task.controller");

router.get("/get-tasks", task_controller.getTasks);
router.post("/create-task", task_controller.createTask);
router.delete("/delete-task/:taskId", task_controller.deleteTask);
router.put("/update-task/:taskId", task_controller.updateTask);

module.exports = router;
