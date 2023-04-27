const path = require('path')
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const config = require('./config/index')
const db = require('./db')(config)
const client = require('./routes/client')
const project_doer = require('./routes/project_doer')
const project = require('./routes/project')
const progress = require('./routes/progress')
const cors = require('cors')

//const appLocalsStringsMiddleware = require('./middlewares/app_locals')
const notFoundMiddleware = require('./middlewares/not_found')
const errorMiddleware = require('./middlewares/error')


const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(__dirname))



app.get('/', (req, res) => {
  res.send('All right')
})

app.use('/client', client)
app.use('/project_doer', project_doer)
app.use('/project', project)
app.use('/progress',progress)

const { host, port } = config

app.listen(port, host, () => {
  console.log(`Run server`)
})
