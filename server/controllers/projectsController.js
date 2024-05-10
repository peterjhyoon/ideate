const Project = require('../models/Project')
const User = require('../models/User')
const Application = require('../models/Application')
const Location = require('../models/Location')
const Category = require('../models/Category')
const asyncHandler = require('express-async-handler')
const { ObjectId } = require('mongodb');

// @desc Get all projects
// @route GET /projects
// @access Private
const getAllProjects = asyncHandler(async (req, res) => {
    // Fetch projects
    const projects = await Project.find().populate('user').lean().exec()

    if (!projects?.length) {
        return res.status(404).json({ message: 'No projects found' })
    }

    // Replace location and category ID with info
    const projectsWithInfo = await Promise.all(projects.map(async (project) => {
        const location = await Location.findById(project.location).lean().exec()
        const category = await Category.findById(project.category).lean().exec()
        return { ...project, location: location, category: category.category }
    }))

    res.json(projectsWithInfo)
})

// @desc Create new project
// @route POST /projects
// @access Private
const createNewProject = asyncHandler(async (req, res) => {
    // Load data from request
    const { name, logo, user, location, category, description } = req.body

    // Confirm data
    if (!name || !user || !location || !category) {
        return res.status(400).json({ message: 'All fields required' })
    }

    // Check for duplicate name
    const duplicate = await Project.findOne({ name }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(400).json({ message: 'Duplicate name' })
    }

    // Create project
    let projectObject = { name, user, location, category }

    if (logo) {
        projectObject.logo = logo
    }

    if (description) {
        projectObject.description = description
    }

    const project = await Project.create(projectObject)

    if (project) {
        res.status(200).json({ message: `New project ${name} created` })
    } else {
        res.status(400).json({ message: 'Invalid data received' })
    }
})

// @desc Get project by ID
// @route GET /projects/id
// @access Private
const getProject = asyncHandler(async (req, res) => {
    // Load ID from request
    const { id } = req.body

    const project = await Project.findById(id).populate(user).lean().exec()
    
    if (!project) {
        res.status(404).json({ message: 'Project not found' })
    }

    // Get location and category from database and override IDs with information
    const location = await Location.findById(project.location).lean().exec()
    const category = await Category.findById(project.category).lean().exec()

    res.json({ ...project, location: location, category: category.category })
})

// @desc Update a project
// @route PATCH /projects
// @access Private
const updateProject = asyncHandler(async (req, res) => {
    // Load data from request
    const { id, name, logo, user, location, category, description } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Project ID required' })
    }

    // Find project
    const project = await Project.findById(id).exec()

    if (!project) {
        res.status(400).json('Project not found')
    }

    // Check if the name to update to already exists
    if (name) {
        const duplicate = await Project.findOne({ name }).collation({ locale: 'en', strength: 2 }).lean().exec()

        if (duplicate && duplicate._id.toString() !== id) {
            res.status(409).json({ message: 'Duplicate name' })
        }

        project.name = name
    }

    if (logo) {
        project.logo = logo
    }

    if (user) {
        project.user = user
    }

    if (location) {
        project.location = location
    }

    if (category) {
        project.category = category
    }

    if (description) {
        project.description = description
    }

    // Save changes
    const updated = await project.save()

    if (updated) {
        res.json({ message: `${name} updated` })
    }
})

// @desc Delete a project
// @route DELETE /projects/id
// @access Private
const deleteProject = asyncHandler(async (req, res) => {
    // Load ID from request
    const { id } = req.body

    if (!id) {
        res.status(400).json({ message: 'Project ID required' })
    }

    // Check if project still has any applications
    const application = await Application.findOne({ project: id }).lean().exec()

    if (application) {
        res.status(400).json({ message: 'Project still has applications' })
    }

    // Find project
    const project = await Project.findById(id).exec()

    if (!project) {
        res.status(400).json({ message: 'Project not found' })
    }

    // Delete project
    await project.deleteOne()

    res.json({ message: `Name ${project.name} with ID ${project.id} deleted`})
})

// @desc Search project through key
// @route GET /projects/search
// @access Private
const getSearchProject = asyncHandler(async (req, res) => {
    // Load data from request
    const { key, location, category } = req.body

    // Create a pipeline for queries
    const pipeline = []

    if (key) {
        // Define a search query for name and description
        pipeline.push({
            $search: {
                index: 'project_search',
                text: {
                    query: key,
                    path: ['name', 'description'],
                    fuzzy: {} // Enable fuzzy search to search for substrings
                }
            }
        })

        // Define a sort query to sort depending on the relevancy
        pipeline.push({
            $sort: {
                score: { $meta: 'textScore' }
            }
        })
    }

    // Define match query when location and category are provided
    if (location && category) {
        pipeline.push({
            $match: {
                location: new ObjectId(location), // I believe this shows deprecated due to package clashes
                category: new ObjectId(category)  // Done the same way as the newest documentation for MongoDB
            }
        })
    } else if (category) {
        pipeline.push({
            $match: {
                category: new ObjectId(category)
            }
        })
    } else if (location) {
        pipeline.push({
            $match: {
                location: new ObjectId(location)
            }
        })
    }

    // Aggregate the pipeline to run the queries
    const projects = await Project.aggregate(pipeline)

    if (!projects?.length) {
        return res.status(404).json({ message: 'No projects found' })
    }

    // Replace location and category ID with info
    const projectsWithInfo = await Promise.all(projects.map(async (project) => {
        const user = await User.findById(project.user).lean().exec()
        const location = await Location.findById(project.location).lean().exec()
        const category = await Category.findById(project.category).lean().exec()
        return { ...project, user: user, location: location, category: category.category }
    }))

    res.json(projectsWithInfo)
})

module.exports = {
    getAllProjects,
    createNewProject,
    getProject,
    updateProject,
    deleteProject,
    getSearchProject
}