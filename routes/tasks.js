var express = require('express');
const tasksController = require('../controllers/tasksController');
var router = express.Router();

router.get('/', tasksController.allTasks);
router.post('/', tasksController.newTask);
router.get('/:id', tasksController.taskDetails);
router.delete('/', tasksController.deleteTask);



module.exports = router;
