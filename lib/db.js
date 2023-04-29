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

function add(bridgeID, strain, motionTraffic, maxStrain) {
  let avgStrain = strain / motionTraffic;
  db.get("INSERT INTO newData (bridgeID, strain, avgStrain, motionTraffic, maxStrain) VALUES (?, ?, ?, ?, ?)", [
    bridgeID,
    strain,
    avgStrain,
    motionTraffic,
    maxStrain
    ], function(err) {
      if (err) { console.log(err); }
    }) 
}

async function read(bridgeID, callback) {
  console.log("read " + bridgeID)
  await db.get("SELECT * FROM newData WHERE bridgeID = 'S014 19287'", (err, rows) => {
    console.log(rows);
    callback(rows);
    return rows;
  })
}

export default {
    init,
    add,
    read
}