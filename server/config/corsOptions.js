const allowedOrigins = require("./allowedOrigins")

const corsOptions = {
    origin: (origin, callback) => {
        // !origin allows postman to access, remove when deployment
        if (allowedOrigins.indexOf(origin) != -1 || !origin) { 
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }, 
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions