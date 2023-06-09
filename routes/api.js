import express from 'express'

import db from "../lib/db.js"

import {parse} from 'csv-parse'
import * as fs from 'fs';

const router = express.Router()

router.get('/bridgeID/:bridgeID', async (req,res) => {
    console.log(req.params['bridgeID']);
    await db.read(req.params['bridgeID'], (data) => {
      res.json(data);
    })
})


router.post('/', async (req, res) => {
    console.log(req.body)
  db.add(req.body.bridgeID, req.body.strain, req.body.motionTraffic, req.body.maxStrain)
})

router.get('/getAll', async (req, res) => {
  //pipe data
  var bridges = [];
  var bridgeIds = {}; // Object to keep track of added bridge IDs
  var parser = await parse({columns: true}, function (err, records) {
      records.forEach(function(record) {
          if(record.longitude != '0' && bridges.length < 200 && !bridgeIds[record.structureNumber]) {
              bridgeIds[record.structureNumber] = true; // Mark the ID as added
              bridges.push({
                  id: record.structureNumber,
                  lat: parseInt(record.latitude) / 1000000,
                  lng: parseInt(record.longitude) / 1000000,
                  yearBuilt: record.yearBuilt,
                  avgDailyTraffic: record.averageDailyTraffic,
                  avgSnowfall: record.snowfall
              });
          }
      });
  });
  fs.createReadStream('./nebraska.csv').pipe(parser).on("end", () => {
      // Send the bridge data to the EJS template
      res.status(200).json(bridges);
  });
})

export { router }