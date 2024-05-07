const express = require('express')
const router = express.Router()
const locationsController = require('../controllers/locationsController')

router.route('/')
    .get(locationsController.getAllLocations)

module.exports = router