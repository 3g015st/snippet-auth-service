const bunyan = require("bunyan");
const logger = bunyan.createLogger({
  name: "Sideline API Log",
  streams: [
    {
      level: "debug",
      stream: process.stdout,
    },
    {
      level: "error",
      path: process.cwd() + "/logs/sideline-api-error.log",
    },
  ],
});

module.exports = logger;
