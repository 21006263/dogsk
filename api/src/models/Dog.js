const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id: {
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      
    },

    height: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },

    weight: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    
    life_span: {
      type: DataTypes.STRING,
      
      get(){
        return this.getDataValue('life_span') + ' años';
      }
    },

    createInDb: { 
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, 
    },

    image: {
      type: DataTypes.TEXT,

    }
  
  }, 
    {
      timestamps: false
    })  
};
