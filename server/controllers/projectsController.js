const User = require('../models/User')
const Project = require('../models/Project')
const Application = require('../models/Application')
const Location = require('../models/Location')
const Category = require('../models/Category')
const asyncHandler = require('express-async-handler')

// @desc Get all projects
// @route GET /projects
// @access Private
const getAllProjects = asyncHandler(async (req, res) => {
    // Fetch projects
    const projects = Project.find().lean().exec()

    if (!projects?.length) {
        return res.status(400).json({ message: 'No projects found' })
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
    const { name, user, location, category, description } = req.body

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

    if (description) {
        projectObject.description = description
    }

    const project = await Project.create(projectObject)

    if (project) {
        res.status(201).json({ message: `New project ${name} created` })
    } else {
        res.status(400).json({ message: 'Invalid data received' })
    }
})

// @desc Get project by ID
// @route GET /projects/:id
// @access Private
const getProject = asyncHandler(async (req, res) => {
    // Load ID from route parameter
    const id = req.params.id

    const project = await Project.findById(id).lean().exec()
    
    if (!project) {
        res.status(400).json({ message: 'Project not found' })
    }

    // Get location and category from database and override IDs with information
    const location = await Location.findById(project.location).lean().exec()
    const category = await Category.findById(project.category).lean().exec()

    res.json({ ...project, location: location, category: category.category })
})

// @desc Update a project
// @route PATCH /projects/:id
// @access Private
const updateProject = asyncHandler(async (req, res) => {
    // Load data from request
    const { name, user, location, category, description } = req.body

    // Load ID from route parameter
    const id = req.params.id

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
// @route DELETE /projects/:id
// @access Private
const deleteProject = asyncHandler(async (req, res) => {
    // Load ID from route parameter
    const id = req.params.id

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
// @route GET /projects/search/:id
// @access Private
const getSearchProject = asyncHandler(async (req, res) => {
    // Load data from request
    const { key, location, category } = req.body

    // Define query according to request given
    let query = { }

    if (key) {
        query.$text = { $search: key }
    }

    if (location) {
        query.location = location
    }

    if (category) {
        query.category = category
    }

    // Fetch projects with query
    const projects = Project.find(query).lean().exec()

    if (!projects?.length) {
        return res.status(400).json({ message: 'No projects found' })
    }

    // Replace location and category ID with info
    const projectsWithInfo = await Promise.all(projects.map(async (project) => {
        const location = await Location.findById(project.location).lean().exec()
        const category = await Category.findById(project.category).lean().exec()
        return { ...project, location: location, category: category.category }
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