module.exports = function(sequelize, DataTypes) {
    var Thread = sequelize.define("Thread", {

    created: Date,
    author: {
        type: ObjectId,
        ref: 'User'
    },
    title: String,
    topic: String,
    views: Number,
    replies: Number,
    sticky: Boolean,
    locked: Boolean

})
return Thread
};
