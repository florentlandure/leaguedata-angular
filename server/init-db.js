const mongoose = require('mongoose');
const request = require('request');
const apiKey = 'RGAPI-ad4193b2-3bd8-4de9-a9c8-c397f91b6fa7';
const championSchema = require('./db-models/champion-model').championSchema;
const Champion = mongoose.model('Champion', championSchema);
const itemSchema = require('./db-models/item-model').itemSchema;
const Item = mongoose.model('Item', championSchema);
const bluebird = require('bluebird');

mongoose.Promise = bluebird;
//Connect to the database
//if (process.env.NODE_ENV == 'production') {
mongoose.connect('mongodb://heroku_8qxdc73l:ng47h3tu6jq86fjqlevh3i7qqu@ds035016.mlab.com:35016/heroku_8qxdc73l');
//} else {
//mongoose.connect('mongodb://localhost/leaguedata');
//}

let init = function() {
    const championUrl = `https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion?champData=all&api_key=${apiKey}`;

    request({
      url: championUrl,
      json: true
    }, function(err, resp, body) {
      if (!err && resp.statusCode == 200) {
        console.log("Fetched data from the API");
        for (key in body.data) {
          insertChampion(body.data[key]);
        }
        console.log("Champion database updated");
      }
    });

    const itemUrl = `https://global.api.pvp.net/api/lol/static-data/euw/v1.2/item?itemListData=gold,from,into,tags,image,sanitizedDescription&api_key=${apiKey}`;
    console.log(itemUrl);

    request({
      url: itemUrl,
      json: true
    }, function(err, resp, body) {
      if (!err && resp.statusCode == 200) {
        console.log("Fetched data from the API");
        for (key in body.data) {
          insertItem(body.data[key]);
        }
        console.log("Item database updated");
      }
    });
  }
  /**
   * Insert a champion data into the database or updates it if the champion already exists
   *
   * @param {Object} data Champion data from the api
   */
function insertChampion(data) {
  Champion.findOne({
    name: data.name
  }, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      if (docs == null) {
        let champion = createChampion(data);
        champion.save(err => {
          if (err) {
            return handleError(err);
          }
        })
      } else {
        updateDoc(docs, data);
      }
    }
  });
}
/**
 * Update data
 *
 * @param {Object} docs Document in the database
 * @param {Object} data Data from the api
 */
function updateDoc(docs, data) {
  let keys = Object.keys(data);
  for (key in docs) {
    if (keys.indexOf(key) != -1) {
      if (key == 'image') {
        docs.key = data.key.full;
      } else {
        docs.key = data.key;
      }
    }
  }
  docs.save(err => {
    if (err) {
      return handleError(err);
    }
  })
}
/**
 * Create a document based on the Champion model
 *
 * @param {Object} data Champion data from the api
 */
function createChampion(data) {
  let champ = new Champion({
    id: data.id,
    name: data.name,
    title: data.title,
    key: data.key,
    stats: {
      armor: data.stats.armor,
      armorperlevel: data.stats.armorperlevel,
      attackdamage: data.stats.attackdamage,
      attackdamageperlevel: data.stats.attackdamageperlevel,
      attackrange: data.stats.attackrange,
      attackspeedoffset: data.stats.attackspeedoffset,
      attackspeedperlevel: data.stats.attackspeedperlevel,
      hp: data.stats.hp,
      hpperlevel: data.stats.hpperlevel,
      hpregen: data.stats.hpregen,
      hpregenperlevel: data.stats.hpregenperlevel,
      movespeed: data.stats.movespeed,
      mp: data.stats.mp,
      mpperlevel: data.stats.mpperlevel,
      mpregen: data.stats.mpregen,
      mpregenperlevel: data.stats.mpregenperlevel,
      spellblock: data.stats.spellblock,
      spellblockperlevel: data.stats.spellblockperlevel
    },
    tags: ((data.tags != null) ? data.tags : []),
    info: {
      attack: data.info.attack,
      defense: data.info.defense,
      difficulty: data.info.difficulty,
      magic: data.info.magic
    },
    passive: {
      description: data.passive.description,
      image: data.passive.image.full,
      name: data.passive.name,
      sanitizedDescription: data.passive.sanitizedDescription
    },
    spells: [],
    lore: data.lore,
    skins: []
  });
  //Populate the array of skins
  for (let i = 0; i < data.skins.length; i++) {
    champ.skins.push({
      id: data.skins[i].id,
      num: data.skins[i].num,
      name: data.skins[i].name
    })
  }
  //Populate the array of spells
  for (let i = 0; i < data.spells.length; i++) {
    champ.spells.push({
      name: data.spells[i].name,
      cooldown: data.spells[i].cooldown,
      cooldownBurn: data.spells[i].cooldownBurn,
      cost: data.spells[i].cost,
      costBurn: data.spells[i].costBurn,
      costType: data.spells[i].costType,
      rangeBurn: data.spells[i].rangeBurn,
      description: data.spells[i].description,
      sanitizedDescription: data.spells[i].sanitizedDescription,
      image: data.spells[i].image.full
    });
  }
  return champ;
}

/**
 * Insert an item data into the database or updates it if the item already exists
 *
 * @param {Object} data Item data from the api
 */
function insertItem(data) {
  Item.findOne({
    name: data.name
  }, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      if (docs == null) {
        let item = createItem(data);
        item.save(err => {
          if (err) {
            return handleError(err);
          }
        })
      } else {
        updateDoc(docs, data);
      }
    }
  });
}
/**
 * Create a document based on the Item model
 *
 * @param {Object} data Item data from the api
 */
function createItem(data) {
  const item = new Item({
    id: data.id,
    sanitizedDescription: data.sanitizedDescription,
    name: data.name,
    image: data.image.full,
    gold: data.gold,
    from: data.from
  });
  return item;
}

function handleError(err) {
  console.log(err);
}
module.exports = init;