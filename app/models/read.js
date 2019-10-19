module.exports = function(sequelize, DataTypes) {
    var Read = sequelize.define("Read", {

    created : Date,
    author  : { type: ObjectId, ref: 'User' },
    title   : String,
    topic   : String,
    views   : Number,
    replies : Number,
    sticky  : Boolean,
    locked  : Boolean

});
return Read;
};
