const express = require('express')
const router = express.Router()
const applicationRoutes = require('../controllers/applicationsController')

router.route('/')
    .get(applicationRoutes.getAllApplications) // Mainly for testing purposes, in reality we would only get with user or project ID
    .post(applicationRoutes.createNewApplication)

router.route('/id')
    .get(applicationRoutes.getApplication)
    .patch(applicationRoutes.updateApplication)
    .delete(applicationRoutes.deleteApplication)

router.route('/user')
    .get(applicationRoutes.getApplicationByUser)

router.route('/project')
    .get(applicationRoutes.getApplicationByProject)

router.route('/user/project')
    .get(applicationRoutes.getApplicationByUserAndProject) // To check whether user has already applied to a certain project

module.exports = router