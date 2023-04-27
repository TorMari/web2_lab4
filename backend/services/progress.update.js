const Progress = require('./../models/progress')

/**
 * @param {Object} data
 */
module.exports = function (data) {
   console.log(data)
   const progress = {
      doer: data.project_doer_id,
      type: data.project_id,
      start: data.start,
      finish: data.finish
   }

   return new Promise((resolve, reject) => {
      Progress.findByIdAndUpdate(
         data.id,
         { $set: progress },
         { new: true },
         function (err, updatedProgress) {
            if (err) {
               reject(err)
            } else {
               resolve(updatedProgress)
            }
         })
   })
}
