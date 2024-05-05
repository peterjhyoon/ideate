const express = require('express')
const router = express.Router()
const saveRoutes = require('../controllers/savesController')

router.route('/')
    .get(saveRoutes.getAllSaves)
    .post(saveRoutes.createNewSave)

router.route('/:id')
    .get(saveRoutes.getSave)
    .patch(saveRoutes.updateSave)
    .delete(saveRoutes.deleteSave)

router.route('/user/:id')
    .get(saveRoutes.getSaveByUser)

router.route('/project/:id')
    .get(saveRoutes.getSaveByProject)

module.exports = router