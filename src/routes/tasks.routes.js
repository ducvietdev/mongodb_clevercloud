const { Router } = require("express");
const TaskController = require("../controllers/tasks.controllers");

const   router = Router();

// Render all tasks
router.get("/", TaskController.renderTasks);

router.post("/tasks/add", TaskController.createTask);

router.get("/tasks/:id/toggleDone", TaskController.taskToggleDone);

router.get("/tasks/:id/edit", TaskController.renderTaskEdit);

router.post("/tasks/:id/edit", TaskController.editTask);

router.get("/tasks/:id/delete", TaskController.deleteTask);

module.exports = router;
