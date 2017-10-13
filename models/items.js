module.exports = function(sequelize, DataTypes) {
  var items = sequelize.define("items", {
    itemBarcode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    itemCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]      
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]   
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reorderPoint: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unitCost: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  items.associate = function(models) {
    items.hasMany(models.itemMovement, {
      onDelete: "cascade"
    });
  };


  return items;
};