const express = require('express')
const Order = require('../models/Order')
const router = express.Router({ mergeParams: true })
const orderService = require('../services/order.service')
const { check, validationResult } = require('express-validator')

router.post('/sendOrder', [
  check('name', 'ФИО не должно быть пустым').notEmpty(),
  check('dateOfBirth', 'Дата рождения не должно быть пустым').notEmpty(),
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: 'INVALID_DATA',
            code: 400,
            errors: errors.array(),
          },
        })
      }
      // const { name, dateOfBirth, diagnosis, doctor } = req.body
      const cryptedData = orderService.crypt({ ...req.body })

      const decryptedData = orderService.decrypt(cryptedData)

      res.status(200).send(decryptedData)
    } catch (e) {
      console.error(e)
      res.status(500).json({ message: 'На сервере произошла ошибка' })
    }
  },
])

module.exports = router
