const mongoose = require('mongoose')

const Schema = mongoose.Schema

const projectSchema = new Schema({
   name: { type: String, required: true, unique: true, max: 50 },
   description: { type: String, require: true, max: 200 },
   type: { type: Schema.Types.ObjectId, ref: 'client', required: true},
   experience: { type: Number, require: true, max: 100 }
})

module.exports = mongoose.model('project', projectSchema)
