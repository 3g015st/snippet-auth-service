const { PORT, SESSION_SECRET } = require("./configs");

const bunyan = require("bunyan");
const bunyanMiddleware = require("bunyan-middleware");
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const logger = bunyan.createLogger({ name: "Sideline" });
const { DatabaseInstance } = require("./db");
const app = express();

app.use(session({ secret: SESSION_SECRET }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  bunyanMiddleware({
    headerName: "X-Request-Id",
    propertyName: "reqId",
    logName: "req_id",
    obscureHeaders: [],
    logger: logger,
    additionalRequestFinishData: function (req, res) {
      return { example: true };
    },
  })
);

const routes = require("./routes");
routes(app);

app.listen(PORT, () => console.log(`Listening on port : ${PORT}`));

module.exports = app;
