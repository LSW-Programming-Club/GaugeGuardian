import express from 'express'
import {parse} from 'csv-parse'
import * as fs from 'fs';

var router = express.Router();

//Map
router.get("/", function (req, res) {
    res.render("index");
})

//Bridge id info
router.get("/:id", function (req, res) {
    //pipe data
    //todo blaine
    var data = null;
    res.render("bridge", {data: data})
})

export { router }