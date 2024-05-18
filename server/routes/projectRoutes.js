const express = require('express')
const router = express.Router()
const projectsController = require('../controllers/projectsController')

router.route('/')
    .get(projectsController.getAllProjects) // Mainly for testing
    .post(projectsController.createNewProject)

router.route('/id/:id')
    .get(projectsController.getProject) // Access information of a specific project
    .patch(projectsController.updateProject)
    .delete(projectsController.deleteProject)

router.route('/search')
    .get(projectsController.getSearchProject) // Search for project through key, location and category

module.exports = router