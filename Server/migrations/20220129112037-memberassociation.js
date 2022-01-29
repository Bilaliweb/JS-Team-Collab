'use strict';

const members = require("../models/members");
const tasks = require("../models/tasks");
const sequelize = require('sequelize');
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('TaskActions', {
      taskId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tasks',
          key: 'id'
        }
      },
      membersId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'members',
          key: 'id'
        }
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,

      }
    });
  },

  async down(queryInterface, Sequelize) {
    return sequelize.dropTable('TaskActions');
  }
};
