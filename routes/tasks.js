const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');


router.get('/', tasksController.allTasks);
router.post('/', tasksController.newTask);
router.get('/:id', tasksController.taskDetails);
router.delete('/', tasksController.deleteTask);



module.exports = router;
