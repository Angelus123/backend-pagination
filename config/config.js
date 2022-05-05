const  dotenv = require("dotenv");

dotenv.config()

module.exports = {
    development: {
        url: process.env.DATABASE_URL,
        port: process.env.PORT
    },
    test: {
        url: process.env.TEST_URL,
        port: process.env.PORT
    },
    production: {
        url: process.env.DEV_URL,
        port: process.env.PORT
    },

}
