const Project = require('./../models/project')

/**
 * @param {Object} data
 */
module.exports = function (data) {
   const project = new Project({
      name: data.name,
      type: data.client_id,
      description: data.description,
      experience: data.experience
   })

   return new Promise((resolve, reject) => {
      project.save(function (err, createdProject) {
         if (err) {
            reject(err)
         } else {
            resolve(createdProject)
         }
      })
   })
}
