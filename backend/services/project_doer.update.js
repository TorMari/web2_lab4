const project_doer = require('./../models/project_doer')

/**
 * @param {Object} data
 */
module.exports = function (data) {
   const project_doerData = {
      name: data.name,
      experience: data.experience,
      doer_num: data.doer_num
   }

   return new Promise((resolve, reject) => {
      project_doer.findByIdAndUpdate(
         data.id,
         { $set: project_doerData },
         { new: true },
         function (err, updatedproject_doer) {
            if (err) {
               reject(err)
            } else {
               resolve(updatedproject_doer)
            }
         })
   })
}
