const express = require('express')
const mongoose = require('mongoose')
const chalk = require('chalk')
const config = require('config')
const cors = require('cors')

const app = express()
const PORT = config.get('port') ?? 8080

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

/* if (process.env.NODE_ENV === 'production') {
  console.log('production')
} else {
  console.log('development')
} */

async function start() {
  try {
    await mongoose.connect(config.get('mongoURI'))
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
