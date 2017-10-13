module.exports = function(sequelize, DataTypes) {
  var itemRecord = sequelize.define("itemRecord", {
    itemBarcode: {
      type: DataTypes.TEXT
     
    },
    itemCode: {
      type: DataTypes.STRING,
      allowNull: false
     
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
      
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

  return itemRecord;
};