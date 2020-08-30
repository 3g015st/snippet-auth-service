const { from, of, Observable } = require("rxjs");
const { mergeMap, map } = require("rxjs/operators");
const { USER_MODEL } = require("../reference/models-reference");
const { JWT_EXPIRATION, JWT_SECRET, REDIS_URI } = require("../configs/index");

const User = require("../models/User");
const { upsert$ } = require("../utils/db-model-util");
const logger = require("../utils/logger");

const moment = require("moment");

const redis = require("redis");
const JWTRedis = require("jwt-redis").default;
const redisClient = redis.createClient(REDIS_URI);
const jwtr = new JWTRedis(redisClient);

const makeJWT = (user) => {
  const payload = {
    jti: user.sidelineId,
    sidelineId: user.sidelineId,
    socialId: user.socialId,
  };
  return jwtr.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};
const cleanUserData = (user) => {
  let userModel = Object.keys(USER_MODEL).reduce((acc, key) => {
    if (!acc[key] && key !== "sidelineId") acc[key] = null;
    return acc;
  }, {});
  const { id, first_name, last_name } = user._json;

  userModel.firstName = first_name;
  userModel.lastName = last_name;
  userModel.lastLoginDate = moment().toDate();
  userModel.socialId = id;

  return userModel;
};

exports.handleAuthSuccess$ = (req) => {
  return new Observable((subscriber) => {
    req.session.destroy((err) => {
      if (err) subscriber.error({ msg: `Session not found` });
      else {
        const cleanedUserData = cleanUserData(req.user);
        upsert$(User, cleanedUserData, {
          socialId: cleanedUserData.socialId,
        }).subscribe(
          async (data) => {
            const jwt = await makeJWT(data);
            subscriber.next({
              msg: `Authentication success`,
              payload: { jwt },
            });
            subscriber.complete();
          },
          (err) => {
            logger.error(`handleAuthSuccess$ : ${err}`);
            subscriber.error({ msg: `Authentication failed` });
          }
        );
      }
    });
  });
};
