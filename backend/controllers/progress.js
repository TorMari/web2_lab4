'use strict'

const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')
const progressAllService = require('./../services/progress.all')
const projectAllService = require('./../services/project.all')
const project_doerAllService = require('./../services/project_doer.all')
const progressCreateService = require('./../services/progress.create')
const progressByIdService = require('./../services/progress.byId')
const progressUpdateService = require('./../services/progress.update')
const progressDeleteService = require('./../services/progress.delete')


module.exports = {
   index(req, res) {
      res.render('pages/progress/index')
   },
   async progressList(req, res) {
      try {
         const progressList = await progressAllService()
         res.render('pages/progress/list', { progress: progressList })
      } catch (error) {
         res.render('pages/progress/list', {
            progress: [],
            errors: [{ msg: error.message }]
         })
      }
   },
   async createProgressForm(req, res) {
      try {
         const projects = await projectAllService()
         const project_doers = await project_doerAllService()

         res.render('pages/progress/add', {
            projects: projects,
            project_doers: project_doers
         })
      } catch (error) {
         res.render('pages/progress/add', {
            projects: [],
            project_doers: [],
            errors: [{ msg: error.message }]
         })
      }
   },
   postCreateProgress: [
      body('project_id')
         .isLength({ min: 1 }).trim().withMessage('Project field must be specified.'),
      body('project_doer_id')
         .isLength({ min: 1 }).trim().withMessage('Project doer field must be specified and integer.'),
      body('start')
         .isLength({ min: 1 }).trim().withMessage('Start doer field must be specified.'),
      body('finish')
         .isLength({ min: 1 }).trim().withMessage('Finish doer field must be specified.'),
      sanitizeBody('project_id').escape(),
      sanitizeBody('project_doer_id').escape(),
      sanitizeBody('start').escape(),
      sanitizeBody('finish').escape(),
      async (req, res) => {
         const progressData = req.body
         const projects = await projectAllService()
         const project_doers = await project_doerAllService()
         const errors = validationResult(req)

         if (errors.isEmpty()) {
            try {
               await progressCreateService(req.body)
               req.flash('info', `Project in progress is added`)
               res.redirect('/progress/list')
            } catch (error) {
               res.render('pages/progress/add', {
                  projects: projects,
                  project_doers: project_doers,
                  errors: [{ msg: error.message }]
               })
            }
         } else {
            res.render('pages/progress/add', {
               projects: projects,
               project_doers: project_doers,
               errors: errors.array()
            })
         }
      }
   ],
   async updateProgressForm(req, res, next) {
      try {
         const progress = await progressByIdService(req.params.id)
         if (!progress) {
            const errorServer = new Error('Not found')
            errorServer.status = 404
            next(errorServer)
            return
         }

         const projects = await projectAllService()
         const project_doers = await project_doerAllService()

         res.render('pages/progress/update', {
            progress: progress,
            projects: projects,
            project_doers: project_doers
         })
      } catch (error) {
         const errorServer = new Error(`Internal server error: ${error.message}`)
         errorServer.status = 500
         next(errorServer)
      }
   },
   putUpdateProgress: [
      body('project_id')
         .isLength({ min: 1 }).trim().withMessage('Project field must be specified.'),
      body('project_doer_id')
         .isLength({ min: 1 }).trim().withMessage('Project doer field must be specified and integer.'),
      body('start')
         .isLength({ min: 1 }).trim().withMessage('Start date field must be specified.'),
      body('finish')
         .isLength({ min: 1 }).trim().withMessage('Finish date field must be specified.'),
      sanitizeBody('project_id').escape(),
      sanitizeBody('project_doer_id').escape(),
      sanitizeBody('start').escape(),
      sanitizeBody('finish').escape(),
      async (req, res, next) => {
         const progressData = req.body
         const projects = await projectAllService()
         const project_doers = await project_doerAllService()

         const errors = validationResult(req)
         if (errors.isEmpty()) {
            try {
               const updatedProgress = await progressUpdateService(progressData)
               req.flash('info', `Project "${updatedProgress.id}" in progress is updated`)
               res.redirect('/progress/list')
            } catch (error) {
               res.render('pages/progress/update', {
                  progress: {},
                  newProgress: progressData,
                  projects: projects,
                  project_doers: project_doers,
                  errors: [{ msg: error.message }]
               })
            }
         } else {
            res.render('pages/progress/update', {
               progress: {},
               newProgress: progressData,
               projects: projects,
               project_doers: project_doers, 
               errors: errors.array()
            })
         }
      }
   ],
   deleteProgressFrom(req, res, next) {
      progressByIdService(req.params.id)
         .then(progress => {
            if (progress) {
               res.render('pages/progress/delete', { progress: progress })
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
   deleteProgress(req, res, next) {
      progressDeleteService(req.body)
         .then(progress => {
            req.flash('info', `Project "${progress.id}" in progress is deleted`)
            res.redirect('/progress/list')
         })
         .catch(error => {
            res.render('pages/progress/delete', {
               progress: req.body,
               errors: [{ msg: error.message }]
            })
         })
   }
}
