const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');
const userLogged = require('../middlewares/userLogged');
const taskValidator = require('../validators/taskValidator');


router.get('/', userLogged, tasksController.allTasks);
router.post('/', userLogged, taskValidator, tasksController.newTask);
router.get('/:id', tasksController.editTask);
router.delete('/:id', tasksController.deleteTask);



module.exports = router;
