'use strict';

const labels = require("../models/labels");

module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.addColumn(
      'Labels', // name of Target model
      'TaskId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tasks', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );

  },


  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('labels', 'TaskId');
  }
};
