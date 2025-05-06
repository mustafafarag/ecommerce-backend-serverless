const mongoose = require('mongoose')

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL)
    console.log(`✅ MongoDB connected`)
  } catch (error) {
    console.error(`❌ MongoDB connection error:`, error)
    process.exit(1)
  }
}

module.exports = dbConnect




