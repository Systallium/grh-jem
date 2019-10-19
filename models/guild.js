'use strict'
module.exports = function (sequelize, DataTypes) {
    var Guild = sequelize.define('guild', {
        name: {
            type: DataTypes.STRING,
        },
        realm: {
            type: DataTypes.STRING,
        },
        side: {
            type: DataTypes.STRING,
        }
    });
    return Guild;
};