const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const tokenService = require('../services/token.service')
const router = express.Router({ mergeParams: true })
const { check, validationResult } = require('express-validator')

router.post('/signUp', [
  check('name', 'Минимальная длина имени 3 символа').isLength({ min: 3 }),
  check('login', 'Минимальная длина логина 3 символа').isLength({ min: 3 }),
  check('password', 'Минимальная длина пароля 8 символов').isLength({ min: 8 }),
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
      const { login, password, name } = req.body
      const existingUser = await User.findOne({ login })
      if (existingUser) {
        return res.status(400).json({
          error: {
            message: 'LOGIN_EXISTS',
            code: 400,
          },
        })
      }
      const hashedPassword = await bcrypt.hash(password, 12)

      const newUser = await User.create({
        name,
        login,
        password: hashedPassword,
      })
      const tokens = tokenService.generate({ _id: newUser._id })
      await tokenService.save(newUser._id, tokens.refreshToken)

      res.status(201).json({ ...tokens, userId: newUser._id })
    } catch (e) {
      console.error(e)
      res.status(500).json({ message: 'На сервере произошла ошибка' })
    }
  },
])
router.post('/signInWithPassword', async (req, res) => {})
router.post('/token', async (req, res) => {})

module.exports = router
