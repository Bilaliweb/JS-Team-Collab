'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'attachments', // name of Target model
      'attId', // name of the key we're adding
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
    return queryInterface.removeColumn('attachments', 'attId');
  }
};