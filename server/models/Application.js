const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }, 
        project: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Project'
        },
        completed: {
            type: Boolean,
            default: false
        },
        // Application responses
        // responses: {
        //     type: [String]
        // }   
    }, 
    { // Automatically generates created and updated times
        timestamps: true
    }
)

module.exports = mongoose.model('Application', applicationSchema)