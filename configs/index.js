exports.DB_USER = process.env.DB_USER || `postgres`;
exports.DB_PASS = process.env.DB_PASS || "1234";
exports.DB_NAME = process.env.DB_NAME || "sideline";
exports.DB_HOST = process.env.DB_HOST || "127.0.0.1";
exports.DB_ENGINE = process.env.DB_ENGINE || "postgres";
exports.FB_APP_ID = process.env.FB_APP_ID || "212721209583168";
exports.FB_APP_SECRET =
  process.env.FB_APP_SECRET || "bdc3410683a1905c4a62788a0354bd1b";
exports.FB_CALLBACK_URL =
  process.env.FB_CALLBACK_URL ||
  "http://127.0.0.1:4200/api/auth/facebook/callback";
exports.PORT = process.env.PORT || "4200";
exports.SESSION_SECRET = process.env.SESSION_SECRET || "djtKbnRbr6-06qRmUayHZ";

exports.JWT_EXPIRATION = process.env.JWT_EXPIRATION || 3600;
exports.JWT_SECRET = process.env.JWT_SECRET || "W85YlwUuw0-rqyp8Qk8Cs";

exports.REDIS_URI = process.env.REDIS_URI || "redis://localhost:6379";
