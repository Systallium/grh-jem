'use strict'
module.exports = function(sequelize, DataTypes) {
    var Guild = sequelize.define('Guild', {

    achievementPoints: DataTypes.NUMBER,
    battlegroup: DataTypes.STRING,
    emblem: {
        backgroundColor: DataTypes.STRING,
        border: DataTypes.STRING,
        borderColor: DataTypes.STRING,
        icon: DataTypes.STRING,
        iconColor: DataTypes.STRING
    },

    lastUpdated: DataTypes.Date,
    settings: {
        webAdminBattletag: DataTypes.STRING
    },

    lastModified: DataTypes.NUMBER,
    level: DataTypes.NUMBER,

    members: [{
        character: {
            achievementPoints: DataTypes.NUMBER,
            battlegroup: DataTypes.STRING,
            class: DataTypes.NUMBER,
            gender: DataTypes.NUMBER,
            guild: DataTypes.STRING,
            level: DataTypes.NUMBER,
            name: DataTypes.STRING,
            race: DataTypes.NUMBER,
            realm: DataTypes.STRING,
            spec: {
                backgroundImage: DataTypes.STRING,
                description: DataTypes.STRING,
                icon: DataTypes.STRING,
                name: DataTypes.STRING,
                order: DataTypes.NUMBER,
                role: DataTypes.STRING
            },
            thumbnail: DataTypes.STRING
        },
        rank: DataTypes.NUMBER
    }],

    news: [{
        achievement: {
            accountWide: Boolean,
            criteria: [],
            description: DataTypes.STRING,
            icon: DataTypes.STRING,
            id: DataTypes.NUMBER,
            points: DataTypes.NUMBER,
            rewardItems: [],
            title: DataTypes.STRING
        },
        character: DataTypes.STRING,
        timestamp: DataTypes.NUMBER,
        type: {
            type: DataTypes.STRING
        },
        itemId: DataTypes.NUMBER
    }],

    name: DataTypes.STRING,
    realm: DataTypes.STRING,
    side: DataTypes.NUMBER
});
return Guild;
};
