const { Task } = require('../database/models')

const bcrypt = require('bcrypt');


const tasksController = {
    allTasks: (req, res) => {
        res.render('task-form')
    },

    newTask: async (req, res) => {

        const { title, details} = req.body

        const newTask = await Task.create({
            title, 
            details
        }).catch(console.log)
        res.send('task criada com sucesso')

        
    },

    taskDetails: (req, res) => {
        const user = req.body
    },

    deleteTask: (req, res) => [
        
    ]
}

module.exports = tasksController;