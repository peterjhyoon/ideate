const Location = require('../models/Location')
const asyncHandler = require('express-async-handler')

// @desc Get all locations
// @route GET /locations
// @access Private
const getAllLocations = asyncHandler(async (req, res) => {
    // Fetch locations
    const locations = Location.find().lean().exec()

    if (!locations?.length) {
        return res.status(400).json({ message: 'No locations found' })
    }

    res.json(locations)
})

module.exports = {
    getAllLocations
}