// @desc Get all applications
// @route GET /applications
// @access Private
const getAllApplications = asyncHandler(async (req, res) => {
    // TODO
})

// @desc Create new application
// @route POST /applications
// @access Private
const createNewApplication = asyncHandler(async (req, res) => {
    // TODO
})

// @desc Get application by ID
// @route GET /applications/:id
// @access Private
const getApplication = asyncHandler(async (req, res) => {
    // Load ID from route parameter
    const id = req.params.id
    
    // TODO
})

// @desc Update a application
// @route PATCH /applications
// @access Private
const updateApplication = asyncHandler(async (req, res) => {
    // TODO
})

// @desc Delete a application
// @route DELETE /applications
// @access Private
const deleteApplication = asyncHandler(async (req, res) => {
    // TODO
})

// @desc Get application by User ID
// @route GET /applications/user/:id
// @access Private
const getApplicationByUser = asyncHandler(async (req, res) => {
    // Load ID from route parameter
    const id = req.params.id

    // TODO
})

// @desc Get application by Project ID
// @route GET /applications/project/:id
// @access Private
const getApplicationByProject = asyncHandler(async (req, res) => {
    // Load ID from route parameter
    const id = req.params.id

    //TODO
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