'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ordens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ordens.init({
    id_ordem: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    data_entrada: DataTypes.DATE,
    valor: DataTypes.FLOAT,
    data_saida: DataTypes.DATE,
    id_cliente: DataTypes.INTEGER,
    id_veiculo: DataTypes.INTEGER,
    id_usuario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ordens',
  });
  return ordens;
};