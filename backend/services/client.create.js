const Client = require('./../models/client')

/**
 * @param {Object} data
 */
module.exports = function (data) {
  const client = new Client({
    name: data.name,
    budget: data.budget
  })

  return new Promise((resolve, reject) => {
    client.save(function (err, createdclient) {
      if (err) {
        reject(err)
      } else {
        resolve(createdclient)
      }
    })
  })
}
