const express = require('express')
const router = express.Router()
const applicationRoutes = require('../controllers/applicationsController')

router.route('/')
    .get(applicationRoutes.getAllApplications)
    .post(applicationRoutes.createNewApplication)

router.route('/:id')
    .get(applicationRoutes.getApplication)
    .patch(applicationRoutes.updateApplication)
    .delete(applicationRoutes.deleteApplication)

router.route('/user/:id')
    .get(applicationRoutes.getApplicationByUser)

router.route('/project/:id')
    .get(applicationRoutes.getApplicationByProject)

module.exports = router