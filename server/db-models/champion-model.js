const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

exports.championSchema = new Schema({
    id: Number,
    name: String,
    title: String,
    key: String,
    stats: {
        armor: Number,
        armorperlevel: Number,
        attackdamage: Number,
        attackdamageperlevel: Number,
        attackrange: Number,
        attackspeedoffset: Number,
        attackspeedperlevel: Number,
        hp: Number,
        hpperlevel: Number,
        hpregen: Number,
        hpregenperlevel: Number,
        movespeed: Number,
        mp: Number,
        mpperlevel: Number,
        mpregen: Number,
        mpregenperlevel: Number,
        spellblock: Number,
        spellblockperlevel: Number
    },
    tags: [String],
    info: {
        attack: Number,
        defense: Number,
        difficulty: Number,
        magic: Number
    },
    passive: {
        description: String,
        image: String,
        name: String,
        sanitizedDescription: String
    },
    spells: [{
        name: String,
        cooldown: [Number],
        cooldownBurn: String,
        cost: [Number],
        costBurn: String,
        costType: String,
        rangeBurn: String,
        description: String,
        sanitizedDescription: String,
        image: String
    }],
    lore: String,
    skins: [{
        id: Number,
        num: Number,
        name: String
    }]
});
