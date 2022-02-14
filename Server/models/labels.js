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


  }
  Labels.init({
    title: DataTypes.STRING
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


////////// Labels Done //////////