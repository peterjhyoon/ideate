const Category = require('../models/Category')
const asyncHandler = require('express-async-handler')

// @desc Get all categories
// @route GET /categories
// @access Private
const getAllCategories = asyncHandler(async (req, res) => {
    // Fetch categories
    const categories = await Category.find().lean().exec()

    if (!categories?.length) {
        return res.status(404).json({ message: 'No categories found' })
    }

    res.json(categories)
})

module.exports = {
    getAllCategories
}