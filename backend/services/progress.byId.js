const Progress = require('./../models/progress')

/**
 * @param {Object} data
 */
module.exports = function (id) {
   return new Promise((resolve, reject) => {
      Progress.findById(id, function (err, progress) {
         if (err) {
            reject(err)
         } else {
            resolve(progress)
         }
      })
   })
}
