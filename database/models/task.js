"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.User, {
        as: "tasks_user",
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }
  Task.init(
    {
      id: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Task",
      tableName: "tasks",
      freezeTableName: true,
    }
  );
  return Task;
};
