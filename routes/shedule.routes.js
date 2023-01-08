const express = require('express')
const Shedule = require('../models/Shedule')
const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {
  try {
    const list = await Shedule.findOne()
    res.send(list)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'На сервере произошла ошибка' })
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params

  try {
    if (id === 'undefined') {
      const createdShedule = await Shedule.create(req.body)
      return res.send(createdShedule)
    }
    const newShedule = await Shedule.findByIdAndUpdate(id, req.body, {
      new: true,
    })

    res.send(newShedule)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'На сервере произошла ошибка' })
  }
})

module.exports = router
