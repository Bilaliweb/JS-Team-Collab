'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.addColumn(
      'Tasks', // name of Source model
      'InvoiceId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Invoices', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
  },

  async down(queryInterface, Sequelize) {

    return queryInterface.removeColumn('Tasks', 'InvoiceId');
  }
};
