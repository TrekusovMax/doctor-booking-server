const express = require('express')
const Order = require('../models/Order')
const router = express.Router({ mergeParams: true })
const orderService = require('../services/order.service')
const { validationResult } = require('express-validator')
const auth = require('../middleware/auth.middleware')

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
router.get('/getAllOrders', [
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
      res.status(200).send(decodedOrdersList)
    } catch (e) {
      console.error(e)
      res.status(500).json({ message: 'На сервере произошла ошибка' })
    }
  },
])
router.get('/getOrdersOnMonth/:month/:year', [
  async (req, res) => {
    const { month, year } = req.params
    try {
      const ordersList = await Order.find({
        isOpen: true,
        start: {
          $gte: new Date(year, month - 1, 1),
        },
        end: {
          $lte: new Date(year, month, 0),
        },
      })

      const decodedOrdersList = ordersList.map((item) => {
        return {
          id: item._id,
          ...JSON.parse(orderService.decrypt(item.order)),
          start: item.start,
          end: item.end,
          isOpen: item.isOpen,
        }
      })
      res.status(200).send(decodedOrdersList)
    } catch (e) {
      console.error(e)
      res.status(500).json({ message: 'На сервере произошла ошибка' })
    }
  },
])

router.patch('/:orderId', async (req, res) => {
  const { orderId } = req.params
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { isOpen: false },
      {
        new: true,
      },
    )
    if (!updatedOrder) throw new Error('Запись не найдена!')
    res.send(updatedOrder._id)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: e.message })
  }
})
router.delete('/:orderId', async (req, res) => {
  const { orderId } = req.params
  try {
    const deletedOrder = await Order.findByIdAndRemove(orderId)
    if (!deletedOrder) throw new Error('Запись не найдена!')
    res.send(deletedOrder._id)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: e.message })
  }
})

module.exports = router
