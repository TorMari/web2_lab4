const client = require('./../models/client')

/**
 * @param {Object} data
 */
module.exports = function (data) {
  return new Promise((resolve, reject) => {
    client.findByIdAndDelete(data.id, function (err, deletedclient) {
      if (err) {
        reject(err)
      } else {
        resolve(deletedclient)
      }
    })
  })
}
