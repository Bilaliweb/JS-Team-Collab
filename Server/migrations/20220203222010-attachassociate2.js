'use strict';

const labels = require("../models/labels");

module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.addColumn(
      'Labels', // name of Target model
      'taskId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'tasks', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    ).then(() => {
      return queryInterface.addColumn(
        'attachments', // name of Target model
        'taskId', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'tasks', // name of Source model
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        })

    }).then(() => {
      return queryInterface.addColumn(
        'tasks', // name of Source model
        'invoiceId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'invoices', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
  },



  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Labels', 'taskId').then(() => {
      return queryInterface.removeColumn('attachments', 'taskId').then(() => { return queryInterface.removeColumn('tasks', 'invoiceId'); });
    });
  }
};
