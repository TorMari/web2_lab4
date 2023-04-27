const progress = require('./../models/progress')

/**
 * @param {Object} data
 */
module.exports = function (data) {
   return new Promise((resolve, reject) => {
      progress.findByIdAndDelete(data.id, function (err, deletedprogress) {
         if (err) {
            reject(err)
         } else {
            resolve(deletedprogress)
         }
      })
   })
}
