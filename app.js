import express from 'express'
var app = express();

import sqlite3 from 'sqlite3';

import logger from 'morgan';

app.use(logger('dev'));

// Allows server side rendering
app.set('view engine', 'ejs')

// Static Web Files
app.use(express.static('public'))
// Flatten icons to /public for device support reasons
app.use(express.static('public/icons'))

// Import routing from other routers in ./routes
import { router as frontend } from './routes/frontend.js'
import { router as api } from './routes/api.js'

app.use("/", frontend);
app.use("/api", api);

//start the Express server
app.listen(9090, () => {
    console.log(`server started at http://localhost:9090` );
});

//db
var db = new sqlite3.Database('./data.db');

db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS newData ( \
      id INTEGER PRIMARY KEY, \
      bridgeID STRING, \
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