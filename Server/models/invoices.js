'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class invoices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

  }

  invoices.init({
    billable_hours: DataTypes.FLOAT,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'invoices',
  });


  invoices.associate = (models) => {
    invoices.hasMany(models.tasks);
  }
  return invoices;
};


//////////// Invoices Done ////////////