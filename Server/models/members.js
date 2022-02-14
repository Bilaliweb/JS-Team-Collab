'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class members extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

  }

  members.init({
    name: DataTypes.STRING
  },
    {
      sequelize,
      modelName: 'members',
    });

  members.associate = (models) => {
    members.belongsToMany(models.tasks, { through: 'TaskActions' });
  }
  return members;
};


/////////// Members Done ///////////