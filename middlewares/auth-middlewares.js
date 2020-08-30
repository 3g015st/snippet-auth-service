const { UNAUTHORIZED } = require("http-status-codes");
const { JWT_SECRET, REDIS_URI } = require("../configs");

const logger = require("../utils/logger");
const redis = require("redis");
const JWTRedis = require("jwt-redis").default;

const redisClient = redis.createClient(REDIS_URI);
const jwtr = new JWTRedis(redisClient);

const User = require("../models/User");

exports.isJWTAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1];

  if (!token) res.status(UNAUTHORIZED).json({ msg: "Unauthorized" });
  else {
    try {
      const decoded = await jwtr.verify(token, JWT_SECRET);
      const user = await User.findByPk(decoded.sidelineId);

      if (!user) throw `Unauthorized`;
      else req.user = user;
      return next();
    } catch (err) {
      logger.error(err);
      res.status(UNAUTHORIZED).json({ msg: "Unauthorized" });
    }
  }
};
