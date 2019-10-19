module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {

    created: DataTypes.DATE,
    author: {  
        type: DataTypes.STRING,
        // ref: 'User'
    },
    thread: {
        type: DataTypes.STRING,
        // ref: 'Thread'
    },
    content: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN

});
return Post
};