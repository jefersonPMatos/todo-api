const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");

const userAuth = require("../middlewares/userAuth");

router.get("/", userAuth, tasksController.allTasks);
router.post("/", userAuth, tasksController.newTask);
router.post("/:id", userAuth, tasksController.editTask);
router.delete("/:id", userAuth, tasksController.deleteTask);

module.exports = router;
