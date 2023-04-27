'use strict'

const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')
const project_doerAllService = require('./../services/project_doer.all')
const project_doerCreateService = require('./../services/project_doer.create')
const project_doerByIdService = require('./../services/project_doer.byId')
const project_doerUpdateService = require('./../services/project_doer.update')
const project_doerDeleteService = require('./../services/project_doer.delete')

module.exports = {
   index(req, res) {
      res.render('pages/project_doer/index')
   },
   project_doerList(req, res) {
      project_doerAllService()
         .then(project_doerList => {
            res.render('pages/project_doer/list', {
               project_doers: project_doerList
            })
         })
         .catch(error => {
            res.render('pages/project_doer/list', {
               project_doers: [],
               errors: [{ msg: error.message }]
            })
         })
   },
   createproject_doerForm(req, res) {
      res.render('pages/project_doer/add')
   },
   postCreateproject_doer: [
      body('name')
         .isLength({ min: 1 }).trim().withMessage('Name field must be specified.'),
      body('experience')
         .isLength({ min: 1 }).trim().withMessage('Experience field must be specified.'),
      body('doer_num')
         .isLength({ min: 1 }).trim().withMessage('Number of doers field must be specified.'),
      sanitizeBody('name').escape(),
      sanitizeBody('experience').escape(),
      sanitizeBody('doer_num').escape(),
      (req, res) => {
         const project_doerData = req.body
         const errors = validationResult(req)

         if (errors.isEmpty()) {
            project_doerCreateService(req.body)
               .then(project_doerData => {
                  req.flash('info', `Project doer "${project_doerData.name}" is Added`)
                  res.redirect('/project_doer/list')
               })
               .catch(error => {
                  res.render('pages/project_doer/add', {
                     newproject_doer: project_doerData,
                     errors: [{ msg: error.message }]
                  })
               })
         } else {
            res.render('pages/project_doer/add', {
               newproject_doer: project_doerData,
               errors: errors.array()
            })
         }
      }
   ],
   updateproject_doerForm(req, res, next) {
      project_doerByIdService(req.params.id)
         .then(project_doer => {
            if (project_doer) {
               res.render('pages/project_doer/update', { project_doer: project_doer })
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
   putUpdateproject_doer: [
      body('name')
         .isLength({ min: 1 }).trim().withMessage('Name field must be specified.'),
      body('experience')
         .isLength({ min: 1 }).trim().withMessage('Experience field must be specified.'),
      body('doer_num')
         .isLength({ min: 1 }).trim().withMessage('Number of doers field must be specified.'),
      sanitizeBody('name').escape(),
      sanitizeBody('experience').escape(),
      sanitizeBody('doer_num').escape(),
      (req, res, next) => {
         const project_doerData = req.body

         const errors = validationResult(req)
         if (errors.isEmpty()) {
            project_doerUpdateService(project_doerData)
               .then(project_doer => {
                  req.flash('info', `Project doer "#${project_doer.id} ${project_doer.name}" is Updated`)
                  res.redirect('/project_doer/list')
               })
               .catch(error => {
                  res.render('pages/project_doer/update', {
                     project_doer: {},
                     newproject_doer: project_doerData,
                     errors: [{ msg: error.message }]
                  })
               })
         } else {
            res.render('pages/project_doer/update', {
               project_doer: {},
               newproject_doer: project_doerData,
               errors: errors.array()
            })
         }
      }
   ],
   deleteproject_doerFrom(req, res, next) {
      project_doerByIdService(req.params.id)
         .then(project_doer => {
            if (project_doer) {
               res.render('pages/project_doer/delete', { project_doer: project_doer })
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
   deleteproject_doer(req, res, next) {
      project_doerDeleteService(req.body)
         .then(project_doer => {
            req.flash('info', `Project doer "#${project_doer.id} ${project_doer.name}" is Deleted`)
            res.redirect('/project_doer/list')
         })
         .catch(error => {
            res.render('pages/project_doer/delete', {
               project_doer: req.body,
               errors: [{ msg: error.message }]
            })
         })
   }
}
