module.exports = function(sequelize, DataTypes) {
  var Image = sequelize.define("Image", {

      title: String,
      description: String,
      created: Date
  });
  return Image;
  };