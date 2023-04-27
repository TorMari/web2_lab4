'use strict'

const mongoose = require('mongoose')

let _db = null

module.exports = function (config) {
  const dbUrl = `${config.dbschema}://${config.dbhost}:${config.dbport}/${config.dbname}`
  
  //'mongodb://localhost:27017/testbd'
  console.log(dbUrl)
  mongoose.connect(dbUrl, {
   useUnifiedTopology: true,
   useNewUrlParser: true
  })
    .catch(error => {
      console.error(error.message)
    })

  if (_db === null) {
    _db = mongoose.connection
  }

  return _db
}
