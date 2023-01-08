const express = require('express')
const mongoose = require('mongoose')
const chalk = require('chalk')
const cors = require('cors')
const routes = require('./routes')

const app = express()
const PORT = process.env.PORT ?? 8080

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/api', routes)

/* if (process.env.NODE_ENV === 'production') {
  console.log('production')
} else {
  console.log('development')
} */

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log(chalk.green(`Mongodb connected`))

    app.listen(PORT, () => {
      console.log(chalk.green(`Server running on port ${PORT}`))
    })
  } catch (e) {
    console.log(chalk.red(e.message))
    process.exit(1)
  }
}

start()
