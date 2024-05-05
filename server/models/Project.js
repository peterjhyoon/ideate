const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }, 
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }, 
        location: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Location'
        }, 
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Category'
        },
        description: {
            type: String,
            default: "This project has no description :("
        },
        // Application questions
        // question: {
        //     type: [String]
        // }   
    },
    { // Automatically generates created and updated times
        timestamps: true
    }
)

module.exports = mongoose.model('Project', projectSchema)