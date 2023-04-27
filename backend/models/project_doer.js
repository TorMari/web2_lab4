const mongoose = require('mongoose')

const Schema = mongoose.Schema

const project_doerSchema = new Schema({
   doer_num: {type: Number, require: true, max: 1000000},
   experience: { type: Number, required: true, max: 100 },
   name: { type: String, required: true, unique: true, max: 50 }
})


module.exports = mongoose.model('project_doer', project_doerSchema)
