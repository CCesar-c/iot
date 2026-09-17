'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class veiculos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  veiculos.init({
    id_veiculo: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    modelo: DataTypes.STRING,
    marca: DataTypes.STRING,
    ano: DataTypes.INTEGER,
    id_cliente: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'veiculos',
  });
  return veiculos;
};