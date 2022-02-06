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
    static associate(models) {
      // define association here
    }
  }
  members.init({
    name: DataTypes.STRING,
    task_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'members',
  });

  members.associate = (models) => {
    members.belongsToMany(models.tasks, { through: 'TaskActions' });
  }
  return members;
};


/////////// Members Done ///////////