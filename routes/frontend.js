import express from 'express'

var router = express.Router();

//Map
router.get("/", async function (req, res) {
    res.render("index")
})

//Bridge id info
router.get("/:id", async function (req, res) {
    res.render("bridge");
})

export { router }