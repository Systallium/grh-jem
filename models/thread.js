module.exports = function(sequelize, DataTypes) {
    var Thread = sequelize.define("Thread", {
        // author: {
        //     type: DataTypes.STRING,
        //     ref: 'User'
        // },
        title: DataTypes.STRING,
        // topic: String,
        // views: Number,
        // replies: Number,
        // sticky: Boolean,
        // locked: Boolean

    })
return Thread
};
