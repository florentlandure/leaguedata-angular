const express = require('express');
const app = express();
const request = require('request');
const apiKey = 'RGAPI-ad4193b2-3bd8-4de9-a9c8-c397f91b6fa7';
const initDB = require('./server/init-db');

//Initialise or update the database everyday
initDB();
let initDB_loop = setInterval(initDB, 3600000);

//App settings
app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/dist'));

// Send json header with all routes
app.get('/api/*', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.get('/api/champions', fetchChampions);
app.get('/api/items', fetchItems);

app.get('/api/*', (req, res) => {
  res.send(JSON.stringify({ error: true, type: 404 }));
});

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(app.get('port'), () => {
  console.log("Server running on " + app.get('port'));
});

// FUNCTIONS
function fetchChampions(req, res) {
  const championUrl = `https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion?champData=all&api_key=${apiKey}`;

  request({
    url: championUrl,
    json: true
  }, function(err, resp, body) {
    if (!err && resp.statusCode == 200) {
      res.send(body.data);
    } else {
      res.send({ error: true, type: 404 });
    }
  });
}

function fetchItems(req, res) {
  const itemUrl = `https://global.api.pvp.net/api/lol/static-data/euw/v1.2/item?itemListData=gold,from,into,tags,image,sanitizedDescription&api_key=${apiKey}`;
  console.log(itemUrl);

  request({
    url: itemUrl,
    json: true
  }, function(err, resp, body) {
    if (!err && resp.statusCode == 200) {
      res.send(body.data);
    } else {
      res.send({ error: true, type: 404 });
    }
  });
}