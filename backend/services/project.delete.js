const project = require('./../models/project')

/**
 * @param {Object} data
 */
module.exports = function (data) {
  return new Promise((resolve, reject) => {
    project.findByIdAndDelete(data.id, function (err, deletedproject) {
      if (err) {
        reject(err)
      } else {
        resolve(deletedproject)
      }
    })
  })
}
