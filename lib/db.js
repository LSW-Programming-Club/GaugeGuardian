//db
import sqlite3 from 'sqlite3';
var db = new sqlite3.Database('./data.db');

function init() {
    db.serialize(function() {
        db.run("CREATE TABLE IF NOT EXISTS newData ( \
          id INTEGER PRIMARY KEY, \
          bridgeID TEXT, \
          ts DATETIME DEFAULT CURRENT_TIMESTAMP, \
          strain FLOAT, \
          avgStrain FLOAT, \
          motionTraffic INTEGER, \
          maxStrain FLOAT \
        )");
    
        db.run("CREATE TABLE IF NOT EXISTS origData ( \
            id INTEGER PRIMARY KEY, \
            bridgeID TEXT, \
            entryYear INTEGER, \
            yearBuilt INTEGER, \
            avgTraffic INTEGER, \
            maxStrain FLOAT, \
            snowfall FLOAT \
          )");
      });
}

function add() {
    db.get("INSERT INTO newData (bridgeID, strain, avgStrain, motionTraffic, maxStrain) VALUES (?, ?, ?, ?, ?)", [
        "TEST",
        5.0,
        4.0,
        3,
        5.3
      ], function(err) {
        if (err) { console.log(err); }
    }) 
}

export default {
    init,
    add
}