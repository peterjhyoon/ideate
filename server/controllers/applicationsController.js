const Application = require('../models/Application')
const Project = require('../models/Project')
const asyncHandler = require('express-async-handler')

// @desc Get all applications
// @route GET /applications
// @access Private
const getAllApplications = asyncHandler(async (req, res) => {
    // Fetch applications
    const applications = await Application.find().lean().exec()

    if (!applications?.length) {
        return res.status(404).json({ message: 'No applications found' })
    }

    res.json(applications)
})

// @desc Create new application
// @route POST /applications
// @access Private
const createNewApplication = asyncHandler(async (req, res) => {
    // Fetch data from request
    const { user, project, active } = req.body

    if (!user || !project) {
        return res.status(400).json({ message: 'All fields required' })
    }

    // Prevent user from applying to his own project
    const checkProject = await Project.findById(project).lean().exec()

    if (!checkProject) {
        return res.status(400).json({ message: 'Invalid project' })
    }

    if (user == checkProject.user) {
        return res.status(400).json({ message: 'User can not apply to his own project' })
    }

    // Check if user has already apply to the project
    const application = await Application.findOne({ user, project }).exec()

    if (!application) { // User has not applied before
        // Create new application object and store
        let applicationObject = { user, project }

        if (active) {
            applicationObject.active = active
        }

        const created = await Application.create(applicationObject)

        if (created) {
            return res.json({ message: 'New application created' })
        } else {
            return res.status(400).json({ message: 'Invalid data received' })
        }
    } else if (!application.active) { // User has applied before but application is inactive
        // Reactivate application
        application.active = true;
        const updated = await application.save()

        if (updated) {
            return res.json({ message: 'Application updated' })
        } else {
            return res.status(400).json({ message: 'Invalid data received' })
        }
    } else { // User has applied before but application is still active
        // No action required
        return res.status(400).json({ message: 'Active application currently exists' })
    }
})

// @desc Get application by ID
// @route GET /applications/id/:id
// @access Private
const getApplication = asyncHandler(async (req, res) => {
    // Load ID from parameters
    const { id } = req.params

    if (!id) {
        return res.status(400).json({ message: 'ID required' })
    }
    
    // Fetch application
    // Note: didn't populate user nor project, fetch user and project in frontend
    const application = await Application.findById(id).lean().exec()

    if (!application) {
        return res.status(404).json({ message: 'Application not found' })
    }

    res.json(application)
})

// @desc Update a application
// @route PATCH /applications/id/:id
// @access Private
const updateApplication = asyncHandler(async (req, res) => {
    // Load ID from parameters
    const { id } = req.params

    // Load request
    const {active } = req.body // No need to update user or project

    if (!id) {
        return res.status(400).json({ message: 'ID required' })
    }

    // Fetch application
    const application = await Application.findById(id).exec()

    if (!application) {
        return res.status(400).json({ message: 'Application not found' })
    }
    
    console.log(application._id)

    if (active != null) {
        application.active = active
    }

    console.log (application.active)

    const updated = await application.save()

    if (updated) {
        res.json({ message: 'Application updated' })
    } else {
        res.status(400).json({ message: 'Invalid data received' })
    }
})

// @desc Delete a application
// @route DELETE /applications/id/:id
// @access Private
const deleteApplication = asyncHandler(async (req, res) => {
    // Load ID from parameters
    const { id } = req.params

    if (!id) {
        return res.status(400).json({ message: 'ID required' })
    }

    const application = await Application.findById(id).exec()

    if (!application) {
        return res.status(400).json({ message: 'Application not found' })
    }

    await application.deleteOne()

    res.json({ message: `Application with ID ${id} deleted` })
})

// @desc Get application by User ID and search project name
// @route GET /applications/user/:user
// @access Private
const getApplicationByUser = asyncHandler(async (req, res) => {
    // Load User ID from parameters
    const { user } = req.params

    // Load search key from request
    const { key } = req.query

    if (!user) {
        return res.status(400).json({ message: 'User ID required' })
    }

    let query = { user }

    if (key) {
        // Search for projects with names that contain the key
        const projects = await Project.find({ name: { $regex: key, $options: 'i' } }).lean().exec() // option 'i' makes the search case insensitive

        if (!projects?.length) {
            return res.status(404).json({ message: 'No applications found' })
        }

        const projectIds = projects.map(project => project._id);

        query.project = { $in: projectIds }
    }

    // Get applications and replace project id with project object (Note: location and category are still IDs)
    // Mainly for the purpose of accessing project name and logo
    const applications = await Application.find(query).populate({
            path: 'project',
            populate: {
                path: 'location',
            },
        }).lean().exec()

    if (!applications?.length) {
        return res.status(404).json({ message: 'No applications found' })
    }

    res.json(applications)
})

// @desc Get application by Project ID
// @route GET /applications/project/:project
// @access Private
const getApplicationByProject = asyncHandler(async (req, res) => {
    // Load project ID from parameters
    const { project } = req.params

    if (!project) {
        return res.status(400).json({ message: 'Project ID required' })
    }

    // Populate user to display user when viewed by project owner
    const applications = await Application.find({ project }).populate({
        path: 'user',
        select: '-password' // Exclude the 'password' field
    }).lean().exec()

    if (!applications?.length) {
        return res.status(404).json({ message: 'No applications found' })
    }
    
    res.json(applications)
})

// @desc Get application by both User and Project ID
// @route GET /applications/user/:user/project/:project
// @access Private
const getApplicationByUserAndProject = asyncHandler(async (req, res) => {
    // Load IDs from parameters
    const { user, project } = req.params

    if (!user || !project) {
        return res.status(400).json({ message: 'All fields required' })
    }

    // Get application from both IDs and populate project
    const application = await Application.findOne({ user, project }).lean().exec()

    if (!application) {
        return res.status(404).json({ message: 'Application not found' })
    }

    res.json(application)
})

module.exports = {
    getAllApplications,
    createNewApplication,
    getApplication,
    updateApplication,
    deleteApplication,
    getApplicationByUser,
    getApplicationByProject, 
    getApplicationByUserAndProject
}