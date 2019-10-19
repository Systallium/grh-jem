module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {

    created: Date,
    author: {
        type: ObjectId,
        ref: 'User'
    },
    thread: {
        type: ObjectId,
        ref: 'Thread'
    },
    content: String,
    edited: {
        user: {
            type: ObjectId,
            ref: 'User'
        },
        date: Date
    },
    deleted: false

});
return Post
};