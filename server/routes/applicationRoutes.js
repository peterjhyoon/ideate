const express = require('express')
const router = express.Router()
const applicationRoutes = require('../controllers/applicationsController')

router.route('/')
    .get(applicationRoutes.getAllApplications) // Mainly for testing purposes, in reality we would only get with user or project ID
    .post(applicationRoutes.createNewApplication)

router.route('/id')
    .get(applicationRoutes.getApplication) // View specific application for both users and project owners, need to manually fetch user and project info
    .patch(applicationRoutes.updateApplication)
    .delete(applicationRoutes.deleteApplication)

router.route('/user')
    .get(applicationRoutes.getApplicationByUser) // User checking projects he has applied to, can take in a key for searching

router.route('/project')
    .get(applicationRoutes.getApplicationByProject) // Project owner checking applications to his project

router.route('/user/project')
    .get(applicationRoutes.getApplicationByUserAndProject) // To check whether user has already applied to a certain project

module.exports = router