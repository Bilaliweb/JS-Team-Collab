'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
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
      })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn('tasks', 'invoiceId');
  }
};
