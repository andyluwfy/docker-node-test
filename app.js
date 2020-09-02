const express = require('express');
const redis = require('redis');
const rd_client = redis.createClient({ host: '10.97.55.148', port: 6379 });

rd_client.on('connect', function() {
    console.log('Redis client connected');
    this.allOK = true;
});

const app = express();
const router = express.Router();

const path = __dirname + '/views/';
const port = 8080;

router.use(function (req,res,next) {
  console.log('/' + req.method);
  next();
});

router.get('/', function(req,res){
  res.sendFile(path + 'index.html');
});

router.get('/stat', function(req,res){
  res.send(JSON.stringify(rd_client));
});

router.get('/stat__secret', function(req,res){
  res.send(JSON.stringify(pg_client));
});

router.get('/sharks', function(req,res){
  res.sendFile(path + 'sharks.html');
});

app.use(express.static(path));
app.use('/', router);

app.listen(port, function () {
  console.log('Example app listening on port 8080!')
})

const { Client } = require('pg');

const pg_client = new Client({
    user: 'postgres',
    host: '10.104.63.33',
    database: 'nodetest',
    password: 'bP8M8QVObpN4y1cp',
    port: 5432,
});

pg_client.connect();
