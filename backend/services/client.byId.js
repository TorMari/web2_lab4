const client = require('./../models/client')

/**
 * @param {Object} data
 */
module.exports = function (id) {
  return new Promise((resolve, reject) => {
    client.findById(id, function (err, client) {
      if (err) {
        reject(err)
      } else {
        resolve(client)
      }
    })
  })
}
