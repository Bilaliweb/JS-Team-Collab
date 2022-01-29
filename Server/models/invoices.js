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
    static associate(models) {
      // define association here
    }
  }
  invoices.init({
    billable_hours: DataTypes.FLOAT,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'invoices',
  });
  return invoices;
};