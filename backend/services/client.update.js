const client = require('./../models/client')

/**
 * @param {Object} data
 */
module.exports = function (data) {
  const clientData = {
    name: data.name,
    budget: data.budget
  }

  return new Promise((resolve, reject) => {
    client.findByIdAndUpdate(
      data.id,
      { $set: clientData },
      { new: true },
      function (err, updatedclient) {
        if (err) {
          reject(err)
        } else {
          resolve(updatedclient)
        }
      })
  })
}
