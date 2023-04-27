const mongoose = require('mongoose')
const Doer = require('./../models/project_doer')
const Project = require('./../models/project')
const { isUndefined } = require('lodash')

const Schema = mongoose.Schema

const progressSchema = new Schema({
   doer: { type: Schema.Types.ObjectId, ref: 'project_doer', required: true, 
   validate: {
      validator: async function(input)  {
      const doer = await this.model('project_doer').findById(input);
      const numProjects = await this.model('progress').countDocuments({ doer: input });
      return numProjects < Math.ceil(doer.doer_num / 5)
   },
   message: `Doer is already working on the maximum number of projects allowed`}
   }, 
   type: { type: Schema.Types.ObjectId, ref: 'project', required: true, unique: true, validate: {
      validator: async function(input) {
         const project = await Project.findById(input);
         const pr_doer = await Doer.findById(this.doer);
         return pr_doer.experience >= project.experience;
      },
      message: 'Doer doesn`t have enough experience to do this project',
   }, 
},
   start: { type: Date, required: true },
   finish: { type: Date, required: true, validate: function(input) {
         return new Date(input) > new Date(this.start);
     },
      message: 'Invalid finish date'
   }
})

module.exports = mongoose.model('progress', progressSchema)
