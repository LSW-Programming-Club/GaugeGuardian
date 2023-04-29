import express from 'express'

import db from "../lib/db.js"

const router = express.Router()


router.post('/', async (req, res) => {
  db.add()
  console.log(req.body)
})

export { router }