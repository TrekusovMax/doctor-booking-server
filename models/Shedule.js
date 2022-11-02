const { Schema, model } = require('mongoose')

const schema = Schema(
  {
    days: {
      type: Schema.Types.Array,
      require: true,
    },
    date_from: {
      type: Number,
      require: true,
    },
    date_to: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = model('Shedule', schema)
