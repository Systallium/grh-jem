module.exports = function(sequelize, DataTypes) {
  var Image = sequelize.define("Image", {

      title: DataTypes.STRING,
      description: DataTypes.STRING,
      created: DataTypes.DATE
  });
  return Image;
  };