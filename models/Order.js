const { Schema, model } = require('mongoose')

const schema = Schema(
  {
    order: {
      type: String,
      required: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = model('Order', schema)
