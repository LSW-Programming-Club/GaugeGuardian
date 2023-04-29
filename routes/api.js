import express from 'express'

const router = express.Router()


router.post('/api', async (req, res) => {
    console.log(req.body)
  })

export { router }