const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        // Convert profile picture to binary map and then parse to string in client side
        profilePicture: {
            type: String
            // TODO: Add default profile picture
            // default: 
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: "Nothing here. "
        },
    },
    { // Automatically generates created and updated times
        timestamps: True
    }
)

module.exports = mongoose.model('User', userSchema)