const bcrypt = require('bcrypt');

const tasksController = {
    allTasks: (req, res) => {
        res.render('index')
    },

    newTask: (req, res) => {
        res.render('form-register-user')
    },
    taskDetails: (req, res) => {
        const user = req.body
    },
    deleteTask: (req, res) => [
        
    ]
}

module.exports = tasksController;