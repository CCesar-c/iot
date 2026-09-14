'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ordens', {
      id_ordem: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      data_entrada: {
        type: Sequelize.DATE
      },
      valor: {
        type: Sequelize.FLOAT
      },
      data_saida: {
        type: Sequelize.DATE
      },
      cpf_cliente: {
        type: Sequelize.INTEGER
      },
      id_veiculo: {
        type: Sequelize.INTEGER
      },
      id_usuario: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ordens');
  }
};