const { Task } = require("../database/models");

const tasksController = {
  allTasks: async (req, res) => {
    const user = req.user_id
    const tasks = await Task.findAll({ where: { user_id: user.id}});
  },

  newTask: async (req, res) => {
    const { title, details } = req.body;
    const user = req.session.user;

    await Task.create({
      title,
      details,
      user_id: user.id,
    }).catch(console.log);

    const tasks = await Task.findAll({ where: { user_id: user.id}});

  },

  editTask: async (req, res) => {
    const { id } = req.params;
    const { title, details } = req.body;
    const user = req.session.user;

    const task = await Task.findOne({ where: { id } });


    if (task.user_id !== user.id) {
      res.send("Você não tem permisão para editar esta tarefa!");
    } else {
      await Task.update(
        {
          title,
          details,
        },
        { where: { id } }
      );
    }

    const tasks = await Task.findAll({ where: { user_id: user.id}});
  },

  deleteTask: async (req, res) => {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id } });
    const user = req.session.user;

    if (task.user_id !== user.id) {
      res.send("Você não tem permisão para deletar esta tarefa");
    } else {
      await Task.destroy({ where: { id: task.id } });
    }
    const tasks = await Task.findAll({ where: { user_id: user.id}});

  },
};

module.exports = tasksController;
