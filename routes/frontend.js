var express = require('express');
var router = express.Router();

//Map
router.get("/", function (req, res) {
    res.render("map");
})

//Bridge id info
router.get("/:id", function (req, res) {
    //pipe data
    //todo blaine
    var data = null;
    res.render("bridge", {data: data})
})

module.exports = router;