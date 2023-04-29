import express from 'express'

import db from "../lib/db.js"

var router = express.Router();

//Map
router.get("/", async function (req, res) {
    res.render("index")
})

//Bridge id info
router.get("/:id", async function (req, res) {
    await db.read(req.params['id'], (data) => {
        //Score calculation
        var score = data.avgStrain * 10;
        var scoreFixed = score.toFixed(1);
        data.score = scoreFixed;
        res.render("bridge", {bridge: data});
    })
})

export { router }