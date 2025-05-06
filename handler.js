const serverless = require('serverless-http')
const dotenv = require('dotenv')
dotenv.config()

const app = require('./index')
module.exports.handler = serverless(app)
