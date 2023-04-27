'use strict'

const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')
const projectAllService = require('./../services/project.all')
const clientAllService = require('./../services/client.all')
const projectCreateService = require('./../services/project.create')
const projectByIdService = require('./../services/project.byId')
const projectUpdateService = require('./../services/project.update')
const projectDeleteService = require('./../services/project.delete')


module.exports = {
   index(req, res) {
      res.render('pages/project/index')
   },
   async projectList(req, res) {
      try {
         const projectList = await projectAllService()
         res.render('pages/project/list', { projects: projectList })
      } catch (error) {
         res.render('pages/project/list', {
            projects: [],
            errors: [{ msg: error.message }]
         })
      }
   },
   async createProjectForm(req, res) {
      try {
         const clients = await clientAllService()

         res.render('pages/project/add', {
            clients: clients
         })
      } catch (error) {
         res.render('pages/project/add', {
            clients: [],
            errors: [{ msg: error.message }]
         })
      }
   },
   postCreateProject: [
      body('name')
         .isLength({ min: 1 }).trim().withMessage('Name field must be specified.'),
      body('client_id')
         .isLength({ min: 1 }).trim().withMessage('Client field must be specified and integer.'),
      body('description')
         .isLength({ min: 1 }).trim().withMessage('Description field must be specified.'),
      body('experience')
         .isLength({ min: 1 }).trim().withMessage('Experience field must be specified.'),
      sanitizeBody('name').escape(),
      sanitizeBody('client_id').escape(),
      sanitizeBody('description').escape(),
      sanitizeBody('experience').escape(),
      async (req, res) => {
         const projectData = req.body
         const clients = await clientAllService()
         const errors = validationResult(req)

         if (errors.isEmpty()) {
            try {
               await projectCreateService(req.body)
               req.flash('info', `Project "${projectData.name} " is Added`)
               res.redirect('/project/list')
            } catch (error) {
               res.render('pages/project/add', {
                  clients: clients,
                  errors: [{ msg: error.message }]
               })
            }
         } else {
            res.render('pages/project/add', {
               clients: clients,
               errors: errors.array()
            })
         }
      }
   ],
   async updateProjectForm(req, res, next) {
      try {
         const project = await projectByIdService(req.params.id)
         if (!project) {
            const errorServer = new Error('Not found')
            errorServer.status = 404
            next(errorServer)
            return
         }

         const clients = await clientAllService()

         res.render('pages/project/update', {
            project: project,
            clients: clients
         })
      } catch (error) {
         const errorServer = new Error(`Internal server error: ${error.message}`)
         errorServer.status = 500
         next(errorServer)
      }
   },
   putUpdateProject: [
      body('name')
         .isLength({ min: 1 }).trim().withMessage('Name field must be specified.'),
      body('client_id')
         .isLength({ min: 1 }).trim().withMessage('Client field must be specified and integer.'),
      body('description')
         .isLength({ min: 1 }).trim().withMessage('Description field must be specified.'),
      body('experience')
         .isLength({ min: 1 }).trim().withMessage('Experience field must be specified.'),
      sanitizeBody('name').escape(),
      sanitizeBody('client_id').escape(),
      sanitizeBody('description').escape(),
      sanitizeBody('experience').escape(),
      async (req, res, next) => {
         const projectData = req.body
         const clients = await clientAllService()

         const errors = validationResult(req)
         if (errors.isEmpty()) {
            try {
               const updatedProject = await projectUpdateService(projectData)
               req.flash('info', `Project "#${updatedProject.id} ${updatedProject.name}" is Updated`)
               res.redirect('/project/list')
            } catch (error) {
               res.render('pages/project/update', {
                  project: {},
                  newProject: projectData,
                  clients: clients,
                  errors: [{ msg: error.message }]
               })
            }
         } else {
            res.render('pages/project/update', {
               project: {},
               newProject: projectData,
               clients: clients,
               errors: errors.array()
            })
         }
      }
      // const success = true
      // const projectData = req.body
      // const mockProject = _getMockProject(projectData.id)

      // if (success) {
      //   req.flash('info', `Project "#${mockProject.id} ${mockProject.address}" is Updated`)
      //   res.redirect('/project/list')
      // } else {
      //   const mockclients = _getMockclientList()

      //   res.render('pages/project/update', {
      //     project: mockProject,
      //     newProject: projectData,
      //     clients: mockclients,
      //     errors: [{ 'msg': 'Error Omg' }]
      //   })
      // }
   ],
   deleteProjectFrom (req, res, next) {
      projectByIdService(req.params.id)
        .then(project => {
          if (project) {
            res.render('pages/project/delete', { project: project })
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
    deleteProject (req, res, next) {
      projectDeleteService(req.body)
        .then(project => {
          req.flash('info', `Project "#${project.id} ${project.name} " is Deleted`)
          res.redirect('/project/list')
        })
        .catch(error => {
          res.render('pages/project/delete', {
            project: req.body,
            errors: [{ msg: error.message }]
          })
        })
    }
}
