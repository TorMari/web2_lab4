const mongoose = require('mongoose')

const Schema = mongoose.Schema

const clientSchema = new Schema({
   budget: { type: Number, required: true, max: 1000000000 },
   name: { type: String, required: true, unique: true, max: 50 }
})

module.exports = mongoose.model('client', clientSchema)

 