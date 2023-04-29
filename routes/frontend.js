import express from 'express'

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