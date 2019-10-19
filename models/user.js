module.exports = function(sequelize, DataTypes) {
var User = sequelize.define("User", {

  
  // user info
  bnetId: Number,
  battletag: String,

  // characters
  characters: [{
    name: String,
    realm: String,
    battlegroup: String,
    class: Number,
    race: Number,
    gender: Number,
    level: Number,
    achievementPoints: Number,
    thumbnail: String
  }],
  mainCharacter: {
    name: String,
    realm: String,
    thumb: String,
    classNum: Number
  },

  // site settings
  showBattletag: Boolean,

  // permissions
  role: {
    officer: Boolean,
    member: Boolean,
    admin: Boolean
  }
})
return User;
};