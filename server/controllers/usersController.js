const User = require('../models/User')
const Project = require('../models/Project')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean().exec()
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }
    res.json(users)
})

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    // Load data from request
    const { email, password, profilePicture, firstName, lastName, description} = req.body

    // Confirm data
    if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate email
    const duplicate = await User.findOne({ email }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate email' })
    }

    // Hash password with 10 salt rounds
    const hashedPwd = await bcrypt.hash(password, 10)

    // Create and store new user
    let userObject
    if (profilePicture && description) {
        userObject = { email, 'password': hashedPwd, profilePicture, firstName, lastName, description }
    } else if (profilePicture) {
        userObject = { email, 'password': hashedPwd, profilePicture, firstName, lastName }
    } else if (description) {
        userObject = { email, 'password': hashedPwd, firstName, lastName, description }
    } else {
        userObject = { email, 'password': hashedPwd, firstName, lastName }
    }

    const user = await User.create(userObject)

    // Check success or not
    if (user) {
        res.status(201).json({ message: `New User ${email} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

// @desc Get user by ID
// @route GET /users/:id
// @access Private
const getUser = asyncHandler(async (req, res) => {
    // Load ID from route parameter
    const id = req.params.id

    const user = await User.findById(id).select('-password').lean().exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    res.json(user)
})

// @desc Update a user
// @route PATCH /users/:id
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    // Load data from request
    const { email, password, profilePicture, firstName, lastName, description} = req.body

    // Load ID from route parameter
    const id = req.params.id

    if (!id) {
        return res.status(400).json({ message: 'User ID required' })
    }

    // Fetch user
    const user = await User.findByID(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate (users are not allowed to have the same email)
    if (email) {
        const duplicate = await User.findOne({ email }).collation({ locale: 'en', strength: 2 }).lean().exec()
        
        if (duplicate && duplicate._id.toString() !== id) {
            return res.status(409).json({ message: 'Duplicate email' })
        }

        user.email = email
    }

    if (password) {
        user.password = await bcrypt.hash(password, 10)
    }

    if (profilePicture) {
        user.profilePicture = profilePicture
    }

    if (firstName) {
        user.firstName = firstName
    }

    if (lastName) {
        user.lastName = lastName
    }

    if (description) {
        user.description = description
    }

    // Save changes
    const updated = await user.save()

    if (updated) {
        res.json({ message: `${user.email} updated` })
    }
})

// @desc Delete a user
// @route DELETE /users/:id
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    // Load ID from route parameter
    const id = req.params.id

    if (!id) {
        return res.status(400).json({ message: 'User ID required' })
    }

    // Check if user still has any applications
    const application = await Note.findOne({ user: id }).lean().exec()
    if (application) {
        return res.status(400).json({ message: 'User has application' })
    }

    // Check if user still has any projects
    const project = await Note.findOne( { user: id }).lean().exec()
    if (project) {
        return res.status(400).json({ message: 'User has application' })
    }

    // Fetch user
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Delete user
    deleted = await user.deleteOne()

    res.json(`Username ${user.username} with ID ${user._id} deleted`)
})

module.exports = {
    getAllUsers,
    createNewUser,
    getUser,
    updateUser,
    deleteUser
}