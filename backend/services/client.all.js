const client = require('./../models/client')

/**
 * @param {Object} data
 */
module.exports = function () {
  return new Promise((resolve, reject) => {
    client.find({}, function (err, clients) {
      if (err) {
        reject(err)
      } else {
        resolve(clients)
      }
    })
  })
}
