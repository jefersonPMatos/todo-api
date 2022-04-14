const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');
const taskValidator = require('../validators/taskValidator');
const userAuth = require('../middlewares/userAuth')


router.get('/', userAuth, tasksController.allTasks);
router.post('/',  userAuth, taskValidator, tasksController.newTask);
router.put('/:id', userAuth, tasksController.editTask);
router.delete('/:id', userAuth, tasksController.deleteTask);



module.exports = router;
