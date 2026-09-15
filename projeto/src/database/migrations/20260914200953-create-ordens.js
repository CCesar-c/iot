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
        allowNull: false,
        type: Sequelize.DATE
      },
      valor: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      data_saida: {
        allowNull: false,
        type: Sequelize.DATE
      },
      id_cliente: {
        type: Sequelize.INTEGER,
        references: {
          model: "clientes",
          key: "id_cliente"
        }
      },
      id_veiculo: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "veiculos",
          key: "id_veiculo"
        }
      },
      id_usuario: {
        allowNull: false,

        type: Sequelize.INTEGER,
        references: {
          model: "usuarios",
          key: "id_usuario"
        }
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