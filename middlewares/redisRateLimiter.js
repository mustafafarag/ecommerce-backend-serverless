const { redisClient } = require('../config/redis')

const rateLimiter = (keyPrefix, limit = 5, windowInSeconds = 900) => {
  return async (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip
    const key = `${keyPrefix}:${ip}`

    try {
      const current = await redisClient.incr(key)

      if (current === 1) {
        await redisClient.expire(key, windowInSeconds)
      }

      const ttl = await redisClient.ttl(key)

      if (current > limit) {
        res.set('Retry-After', ttl)
        return res.status(429).json({
          message: `Too many login attempts. Please try again in ${ttl} seconds.`,
        })
      }

      next()
    } catch (err) {
      console.error('Rate limiter error:', err)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}

module.exports = rateLimiter
