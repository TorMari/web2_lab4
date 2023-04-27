'use strict'

const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')
const clientAllService = require('./../services/client.all')
const clientCreateService = require('./../services/client.create')
const clientByIdService = require('./../services/client.byId')
const clientUpdateService = require('./../services/client.update')
const clientDeleteService = require('./../services/client.delete')

module.exports = {
  index(req, res) {
    res.render('pages/client/index')
  },
  clientList(req, res) {
    clientAllService()
      .then(clientList => {
        res.render('pages/client/list', {
          clients: clientList
        })
      })
      .catch(error => {
        res.render('pages/client/list', {
          clients: [],
          errors: [{ msg: error.message }]
        })
      })
  },
  createclientForm(req, res) {
    res.render('pages/client/add')
  },
  postCreateclient: [
    body('name')
      .isLength({ min: 1 }).trim().withMessage('Name field must be specified.'),
    body('budget')
      .isLength({ min: 1 }).trim().withMessage('Budget field must be specified.'),
    sanitizeBody('name').escape(),
    sanitizeBody('budget').escape(),
    (req, res) => {
      const clientData = req.body
      const errors = validationResult(req)

      if (errors.isEmpty()) {
        clientCreateService(req.body)
          .then(clientData => {
            req.flash('info', `Client "${clientData.name}" is Added`)
            res.redirect('/client/list')
          })
          .catch(error => {
            res.render('pages/client/add', {
              newclient: clientData,
              errors: [{ msg: error.message }]
            })
          })
      } else {
        res.render('pages/client/add', {
          newclient: clientData,
          errors: errors.array()
        })
      }
    }
  ],
  updateclientForm(req, res, next) {
    clientByIdService(req.params.id)
      .then(client => {
        if (client) {
          res.render('pages/client/update', { client: client })
        } else {
          const errorNotFound = new Error('Not found')
          errorNotFound.status = 404
          next(errorNotFound)
        }
      })
      .catch(error => {
        const errorServer = new Error(`Internal server error: ${error.message}`)
        errorServer.status = 500
        next(errorServer)
      })
  },
  putUpdateclient: [
    body('name')
      .isLength({ min: 1 }).trim().withMessage('Name field must be specified.'),
    body('budget')
      .isLength({ min: 1 }).trim().withMessage('Budget field must be specified.'),
    sanitizeBody('name').escape(),
    sanitizeBody('budget').escape(),
    (req, res, next) => {
      const clientData = req.body

      const errors = validationResult(req)
      if (errors.isEmpty()) {
        clientUpdateService(clientData)
          .then(client => {
            req.flash('info', `Client "#${client.id} ${client.name}" is Updated`)
            res.redirect('/client/list')
          })
          .catch(error => {
            res.render('pages/client/update', {
              client: {},
              newclient: clientData,
              errors: [{ msg: error.message }]
            })
          })
      } else {
        res.render('pages/client/update', {
          client: {},
          newclient: clientData,
          errors: errors.array()
        })
      }
    }
  ],
  deleteclientFrom(req, res, next) {
    clientByIdService(req.params.id)
      .then(client => {
        if (client) {
          res.render('pages/client/delete', { client: client })
        } else {
          const errorNotFound = new Error('Not found')
          errorNotFound.status = 404
          next(errorNotFound)
        }
      })
      .catch(error => {
        const errorServer = new Error(`Internal server error: ${error.message}`)
        errorServer.status = 500
        next(errorServer)
      })
  },
  deleteclient(req, res, next) {
    clientDeleteService(req.body)
      .then(client => {
        req.flash('info', `Client "#${client.id} ${client.name}" is Deleted`)
        res.redirect('/client/list')
      })
      .catch(error => {
        res.render('pages/client/delete', {
          client: req.body,
          errors: [{ msg: error.message }]
        })
      })
  }
}
