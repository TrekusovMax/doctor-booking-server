const express = require('express')
const mongoose = require('mongoose')
const chalk = require('chalk')
const cors = require('cors')
const path = require('path')
const routes = require('./routes')
const config = require('config')

const app = express()
//const PORT = process.env.PORT || 8080
const PORT = config.get('port') ?? 8080

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/api', routes)
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client')))
  const indexPath = path.join(__dirname, 'client', 'index.html')

  app.get('*', (req, res) => {
    res.sendFile(indexPath)
  })
}

async function start() {
  try {
    await mongoose.connect(config.get('mongoURI'))
    //await mongoose.connect(process.env.MONGO_URI)
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
