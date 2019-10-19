module.exports = function(sequelize, DataTypes) {
    var Read = sequelize.define("Read", {
        // author  : { 
        //     type: DataTypes.STRING, ref: 'User' },
        title   : DataTypes.STRING,
        topic   : DataTypes.STRING,
        views   : DataTypes.STRING,
        replies : DataTypes.STRING,
        sticky  : DataTypes.STRING,
        locked  : DataTypes.STRING

    })

    // Read.associate = function(models){
        
    // }
    return Read;
};
