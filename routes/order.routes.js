const express = require('express')
const Order = require('../models/Order')
const router = express.Router({ mergeParams: true })
const bcrypt = require('bcryptjs')
const tokenService = require('../services/token.service')
const { check, validationResult } = require('express-validator')

router.post('/sendOrder', [
  check('fio', 'ФИО не должно быть пустым').notEmpty(),
  check('date_of_birth', 'Дата рождения не должно быть пустым').notEmpty(),
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
      const { fio, date_of_birth, target, doctor } = req.body

      res.status(200).send({ fio, date_of_birth, target, doctor })
    } catch (e) {
      console.error(e)
      res.status(500).json({ message: 'На сервере произошла ошибка' })
    }
  },
])

module.exports = router
