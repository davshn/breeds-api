const { DataTypes,Model } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo de la base de datos

  class Temperament extends Model {}

  Temperament.init(     //Base de datos de temperamentos
    {
      temperament: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "temperament",
      tableName: "temperaments",
    }
  )
}