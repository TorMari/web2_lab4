const Progress = require('./../models/progress')

/**
 * @param {Object} data
 */
module.exports = function () {
   return new Promise((resolve, reject) => {
      Progress.find({})
         .populate('type')
         .populate('doer')
         .exec(function (err, progress) {
            if (err) {
               reject(err)
            } else {
               console.log(progress)
               resolve(progress)
            }
         })
   })
}
