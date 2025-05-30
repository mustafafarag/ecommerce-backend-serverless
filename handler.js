const serverless = require('serverless-http')
const dotenv = require('dotenv')
const dbConnect = require('./config/dbConnect')
const { connectRedis } = require('./config/redis')
const app = require('./index')

// Load environment variables from .env file
dotenv.config()

// To take advantage of Lambda Execution Context Reuse for warm starts/performance 
let isInitialized = false

const setup = async () => {
  if (!isInitialized) {
    await Promise.all([
      dbConnect(),    // MongoDB
      connectRedis()  // Redis
    ])
    isInitialized = true
    console.log('✅ MongoDB Atlas and Redis connected')
  }
}

const handler = serverless(app)

module.exports.handler = async (event, context) => {
  await setup()
  return handler(event, context)
}