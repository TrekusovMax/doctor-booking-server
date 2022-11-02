const express = require('express')
const Shedule = require('../models/Shedule')
const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {
  try {
    const list = await Shedule.find()
    res.send(list)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'На сервере произошла ошибка' })
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const newShedule = await Shedule.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    if (newShedule === null) {
      await Shedule.create(req.body)
    }
    res.send(newShedule)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'На сервере произошла ошибка' })
  }
})

module.exports = router
