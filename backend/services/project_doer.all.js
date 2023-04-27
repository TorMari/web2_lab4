const project_doer = require('./../models/project_doer')

/**
 * @param {Object} data
 */
module.exports = function () {
   return new Promise((resolve, reject) => {
      project_doer.find({}, function (err, project_doers) {
         if (err) {
            reject(err)
         } else {
            resolve(project_doers)
         }
      })
   })
}
