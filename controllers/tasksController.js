const {Task
} = require('../database/models')

const bcrypt = require('bcrypt');
const userLogged = require('../middlewares/userLogged');


const tasksController = {

    allTasks: async (req, res) => {

        const tasks = await Task.findAll()
        console.log(tasks)
        res.render('task-form', {
            tasks
        })
    },

    newTask: async (req, res) => {

        const {
            title,
            details
        } = req.body

        await Task.create({
            title,
            details
        }).catch(console.log)

        const tasks = await Task.findAll()

        res.render('task-form', {
            tasks
        })

    },

    editTask: async (req, res) => {
        const {
            id
        } = req.params

        const task = findOne({
            where: {
                id
            }
        })

        const {
            title,
            details
        } = req.body

        const user = req.session.user
        if (task.user_id !== user.id) {

            res.send('Você não tem permisão para editar essa tarefa!')

        } else {

            await Task.update({
                title,
                details
            }, {
                where: {
                    id
                }
            })
        }

        const tasks = await Task.findAll()

        res.render('task-form', {
            tasks
        })
    },

    deleteTask: (req, res) => {
        const { id } = req.params;
        const task = await Task.findOne({ where: { id }});
        const uuser = req.session.user;

        if( task.user_id !== user.id ){
            res.send('Você não tem permisão para deletar essa tarefa')
        } else {
            await Task.destroy({ where:{ id }}).catch(console.log)
        }  
        const tasks = await Task.findAll()

        res.render('task-form', {
            tasks
        })
    }
}

module.exports = tasksController;