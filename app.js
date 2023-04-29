const express = require('express');
const app = express();

const sqlite3 = require('sqlite3').verbose();

var logger = require('morgan');
app.use(logger('dev'));

// Allows server side rendering
app.set('view engine', 'ejs')

// Static Web Files
app.use(express.static('public'))
// Flatten icons to /public for device support reasons
app.use(express.static('public/icons'))

// Import routing from other routers in ./routes
var frontend = require('./routes/frontend');
var api = require('./routes/api');

app.use("/", frontend);
app.use("/api", api);

//start the Express server
app.listen(9090, () => {
    console.log(`server started at http://localhost:9090` );
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
      id STRING PRIMARY KEY, \
      ts DATETIME DEFAULT CURRENT_TIMESTAMP, \
      strain FLOAT, \
      avgStrain FLOAT, \
      motionTraffic INTEGER, \
      maxStrain FLOAT \
    )");

    db.run("CREATE TABLE IF NOT EXISTS origData ( \
        id INTEGER PRIMARY KEY, \
        bridgeID STRING, \
        entryYear INTEGER, \
        yearBuilt INTEGER, \
        avgTraffic INTEGER, \
        maxStrain FLOAT, \
        snowfall FLOAT \
      )");
  });

export default {
    db
};