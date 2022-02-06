'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Labels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Labels.init({
    title: DataTypes.STRING,
    task_id: DataTypes.INTEGER
  },
    {
      sequelize,
      modelName: 'Labels',
    });
  Labels.associate = (models) => {
    Labels.belongsTo(models.tasks);
  }
  return Labels;
};