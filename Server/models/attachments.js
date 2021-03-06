'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attachments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

  }
  attachments.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'attachments',
  });

  attachments.associate = (models) => {
    attachments.belongsTo(models.tasks);
  }
  return attachments;
};


//////////// Attachments Done ////////////