const Project = require('./../models/project')

/**
 * @param {Object} data
 */
module.exports = function () {
   return new Promise((resolve, reject) => {
      Project.find({})
         .populate('type')
         .exec(function (err, projects) {
            if (err) {
               reject(err)
            } else {
               console.log(projects)
               resolve(projects)
            }
         })
   })
}
