'use strict';
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];

/////// ADDED TO PARSE CONNECTION STRING IN TO COMPONENTS /////
if(config.use_env_variable){
  var db_info = process.env[config.use_env_variable].match(/([^:]+):\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
  config.dialect=db_info[1];
  config.username=db_info[2];
  config.password=db_info[3];
  config.host=db_info[4];
  config.port=db_info[5];
  config.database=db_info[6];
}
/////////////////////////////////////

var sequelize = new Sequelize(config.database, config.username, config.password, config);
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);

const db = {};

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
