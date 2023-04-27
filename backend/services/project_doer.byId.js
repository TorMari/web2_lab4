const project_doer = require('./../models/project_doer')

/**
 * @param {Object} data
 */
module.exports = function (id) {
   return new Promise((resolve, reject) => {
      project_doer.findById(id, function (err, project_doer) {
         if (err) {
            reject(err)
         } else {
            resolve(project_doer)
         }
      })
   })
}
