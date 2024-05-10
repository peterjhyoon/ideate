const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema(
    {
        state: {
            type: String
        },
        country: {
            type: String
        },
    }
)

module.exports = mongoose.model('Location', locationSchema)