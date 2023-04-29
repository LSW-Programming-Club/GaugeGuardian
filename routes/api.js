import express from 'express'

const router = express.Router()

import db from app;

router.post('/api', async (req, res) => {
    res.json(await api.acceptHoursRequest(req.body.apiKey))
  })