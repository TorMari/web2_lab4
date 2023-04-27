const project_doer = require('./../models/project_doer')

/**
 * @param {Object} data
 */
module.exports = function (data) {
   return new Promise((resolve, reject) => {
      project_doer.findByIdAndDelete(data.id, function (err, deletedproject_doer) {
         if (err) {
            reject(err)
         } else {
            resolve(deletedproject_doer)
         }
      })
   })
}
