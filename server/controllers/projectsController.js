// @desc Get all projects
// @route GET /projects
// @access Private
const getAllProjects = asyncHandler(async (req, res) => {
    
})

// @desc Create new project
// @route POST /projects
// @access Private
const createNewProject = asyncHandler(async (req, res) => {
    
})

// @desc Get project by ID
// @route GET /projects/:id
// @access Private
const getProject = asyncHandler(async (req, res) => {
    // Load ID from route parameter
    const id = req.params.id
})

// @desc Update a project
// @route PATCH /projects/:id
// @access Private
const updateProject = asyncHandler(async (req, res) => {
    
})

// @desc Delete a project
// @route DELETE /projects/:id
// @access Private
const deleteProject = asyncHandler(async (req, res) => {
    
})

module.exports = {
    getAllProjects,
    createNewProject,
    getProject,
    updateProject,
    deleteProject
}