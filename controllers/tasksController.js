const { User, Task } = require("../database/models");

const tasksController = {
  allTasks: async (req, res) => {
    const { userId } = req.user;
    const tasks = await Task.findAll({ where: { user_id: userId } });

    return res.status(200).json({ tasks });
  },

  newTask: async (req, res) => {
    const { id, text, completed } = req.body;
    const { userId } = req.user;

    await Task.create({
      id,
      text,
      completed,
      user_id: userId,
    });
  },

  editTask: async (req, res) => {
    const { id, text, completed } = req.body;

    await Task.update(
      {
        text,
        completed,
      },
      { where: { id } }
    )
      .then((res) => {
        return res.status(200).json({ msg: "succesfully updated" });
      })
      .catch((error) => {
        return res.status(400).json({ msg: "error " + error });
      });
  },

  deleteTask: async (req, res) => {
    const { id } = req.params;
    await Task.destroy({ where: { id } });
  },
};

module.exports = tasksController;
