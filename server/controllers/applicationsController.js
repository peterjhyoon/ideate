// @desc Get all applications
// @route GET /applications
// @access Private
const getAllApplications = asyncHandler(async (req, res) => {
    
})

// @desc Create new application
// @route POST /applications
// @access Private
const createNewApplication = asyncHandler(async (req, res) => {
    
})

// @desc Get application by ID
// @route GET /applications/:id
// @access Private
const getApplication = asyncHandler(async (req, res) => {
    // Load ID from route parameter
    const id = req.params.id
})

// @desc Update a application
// @route PATCH /applications
// @access Private
const updateApplication = asyncHandler(async (req, res) => {
    
})

// @desc Delete a application
// @route DELETE /applications
// @access Private
const deleteApplication = asyncHandler(async (req, res) => {
    
})

// @desc Get application by User ID
// @route GET /applications/user/:id
// @access Private
const getApplicationByUser = asyncHandler(async (req, res) => {
    // Load ID from route parameter
    const id = req.params.id
})

// @desc Get application by Project ID
// @route GET /applications/project/:id
// @access Private
const getApplicationByProject = asyncHandler(async (req, res) => {
    // Load ID from route parameter
    const id = req.params.id
})

module.exports = {
    getAllApplications,
    createNewApplication,
    getApplication,
    updateApplication,
    deleteApplication,
    getApplicationByUser,
    getApplicationByProject
}