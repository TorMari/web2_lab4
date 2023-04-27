const Project = require('./../models/project')

/**
 * @param {Object} data
 */
module.exports = function (data) {
   console.log(data)
   const project = {
      name: data.name,
      type: data.client_id,
      description: data.description,
      experience: data.experience
   }

   return new Promise((resolve, reject) => {
      Project.findByIdAndUpdate(
         data.id,
         { $set: project },
         { new: true },
         function (err, updatedProject) {
            if (err) {
               reject(err)
            } else {
               resolve(updatedProject)
            }
         })
   })
}
