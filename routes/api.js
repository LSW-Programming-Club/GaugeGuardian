import express from 'express'

import db from "../lib/db.js"

import {parse} from 'csv-parse'
import * as fs from 'fs';

const router = express.Router()


router.post('/', async (req, res) => {
  db.add()
  console.log(req.body)
})

router.get('/getAll', async (req, res) => {
  //pipe data
  var bridges = [];
  var parser = await parse({columns: true}, function (err, records) {
      records.forEach(function(record) {
          if(record.longitude != '0' && bridges.length < 200) {
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