const Project_doer = require('./../models/project_doer')

/**
 * @param {Object} data
 */
module.exports = function (data) {
   const project_doer = new Project_doer({
      name: data.name,
      experience: data.experience,
      doer_num: data.doer_num
   })

   return new Promise((resolve, reject) => {
      project_doer.save(function (err, createdproject_doer) {
         if (err) {
            reject(err)
         } else {
            resolve(createdproject_doer)
         }
      })
   })
}
