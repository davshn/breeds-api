const { DataTypes,Model } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo de base de datos

  class Dog extends Model {}

    Dog.init(   //Base de datos de razas
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      heightMin:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      heightMax:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      origin:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      weightMin:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weightMax:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lifeSpan:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      image:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      created:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      }

    },
    {
      sequelize,
      modelName: "dog",
      tableName: "dogs",
      timestamps: false,
    }
    )};
