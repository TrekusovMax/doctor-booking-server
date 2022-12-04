const { Schema, model } = require('mongoose')

const schema = Schema(
  {
    fio: {
      type: String,
      required: true,
    },
    date_of_birth: {
      type: Date,
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
    doctor: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = model('Order', schema)
