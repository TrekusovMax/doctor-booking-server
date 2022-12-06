const { Schema, model } = require('mongoose')

const schema = Schema(
  {
    order_string: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = model('Order', schema)
