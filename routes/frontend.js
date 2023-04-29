import express from 'express'
import {parse} from 'csv-parse'
import * as fs from 'fs';

var router = express.Router();

//Map
router.get("/", async function (req, res) {
    //pipe data
    var bridges = [];
    var parser = await parse({columns: true}, function (err, records) {
        records.forEach(function(record) {
            if(record.longitude != '0') {
                bridges.push({
                    id: record.structureNumber,
                    lat: parseInt(record.latitude) / 1000000,
                    lng: parseInt(record.longitude) / 1000000,
                });
            }
        });
    });
    fs.createReadStream('./nebraska.csv').pipe(parser).on("end", () => {
        // Send the bridge data to the EJS template
        res.render("index", { bridgeData: bridges });
    });
})

//Bridge id info
router.get("/:id", async function (req, res) {
    res.render("bridge");
})

export { router }