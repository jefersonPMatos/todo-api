'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.User, {
        as: 'tasks_user',
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      })
    }
  }
  Task.init({
    title: DataTypes.STRING,
    details: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    freezeTableName: true
  });
  return Task;
};