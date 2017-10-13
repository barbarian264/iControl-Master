module.exports = function(sequelize, DataTypes) {
  var itemMovement = sequelize.define("itemMovement", {
    itemBarcode: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    itemCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],    
        notEmpty: true      
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]  
      }
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: false
    }

  });

  itemMovement.associate = function(models){
    itemMovement.belongsTo(models.items,{
        foreignKey: {
            allowNull: false
        }
    });
  };

  return itemMovement;
};