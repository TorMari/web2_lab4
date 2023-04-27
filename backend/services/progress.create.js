const Progress = require('./../models/progress')
const mongoose = require('mongoose')
const Doer = require('./../models/project_doer')

/**
 * @param {Object} data
 */
module.exports = function (data) {
   const doer = Doer.findById(data.project_doer_id)
   const existingProgresses = Progress.findOne({ doer: data.project_doer_id }).length
   console.log(existingProgresses);

   const maxProjects = Math.ceil(doer.doer_num / 5)
   if (existingProgresses >= maxProjects) {
      throw new Error(`Doer ${doer.name} cannot work on more than ${maxProjects} projects simultaneously.`)
   } else {
   
   const progress = new Progress({
      doer: data.project_doer_id,
      type: data.project_id,
      start: data.start,
      finish: data.finish
   })

   return new Promise((resolve, reject) => {
      progress.save(function (err, createdProgress) {
         if (err) {
            reject(err)
         } else {
            resolve(createdProgress)
         }
      })
   })
}
}

