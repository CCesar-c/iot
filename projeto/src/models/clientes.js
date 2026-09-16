'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class clientes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  clientes.init({
    id_cliente: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    cpf: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    telefone: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'clientes',
  });
  return clientes;
};