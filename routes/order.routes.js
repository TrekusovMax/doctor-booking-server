const express = require('express')
const Order = require('../models/Order')
const router = express.Router({ mergeParams: true })
const orderService = require('../services/order.service')
const { check, validationResult } = require('express-validator')

router.post('/sendOrder', [
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
      const { name, dateOfBirth, diagnosis, doctor, title, start, end } =
        req.body

      const cryptedData = orderService.crypt({
        name,
        dateOfBirth,
        diagnosis,
        doctor,
        title,
      })

      const newOrder = await Order.create({ order: cryptedData, start, end })

      res.status(200).send({ id: newOrder._id, ...req.body })
    } catch (e) {
      console.error(e)
      res.status(500).json({ message: 'На сервере произошла ошибка' })
    }
  },
])
router.get('/getOrders', [
  async (req, res) => {
    try {
      const ordersList = await Order.find()

      const decodedOrdersList = ordersList.map((item) => {
        return {
          id: item._id,
          ...JSON.parse(orderService.decrypt(item.order)),
          start: item.start,
          end: item.end,
          isOpen: item.isOpen,
        }
      })
      //const decryptedData = orderService.decrypt(cryptedData)

      res.status(200).send(decodedOrdersList)
    } catch (e) {
      console.error(e)
      res.status(500).json({ message: 'На сервере произошла ошибка' })
    }
  },
])

module.exports = router
