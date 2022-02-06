'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tasks.init({
    task_name: DataTypes.STRING,
    description: DataTypes.STRING,
    actual_hour: DataTypes.FLOAT,
    estimated_hour: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'tasks',
  });

  tasks.associate = (models) => {
    tasks.hasMany(models.Labels);
    tasks.hasMany(models.attachments);
    tasks.belongsTo(models.invoices);
    tasks.belongsToMany(models.members, { through: 'TaskActions' });

  }

  return tasks;
};



//////////// Tasks Done ////////////
