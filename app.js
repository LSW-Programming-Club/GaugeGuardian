const express = require('express');
const app = express();

const sqlite3 = require('sqlite3').verbose();

var logger = require('morgan');
app.use(logger('dev'));

//start the Express server
app.listen(8080, () => {
    console.log(`server started at http://localhost:8080` );
});

app.get("/", function(req, res) {
    res.send("Hello")
});

app.post("/data", function (req, res) {
    console.log(req);
})

//db
var db = new sqlite3.Database('./data.db');

db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS newData ( \
      id String PRIMARY KEY, \
      ts DATETIME DEFAULT CURRENT_TIMESTAMP, \
      strain FLOAT, \
      avgStrain FLOAT, \
      motionTraffic INTEGER, \
      maxStrain FLOAT \
    )");

    db.run("CREATE TABLE IF NOT EXISTS origData ( \
        id INTEGER PRIMARY KEY, \
        bridgeID String, \
        entryYear INTEGER, \
        avgTraffic INTEGER, \
        maxStrain FLOAT, \
        snowfall FLOAT \
      )");
  });