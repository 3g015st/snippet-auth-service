const {
  errorHandler,
  notFoundResource,
} = require("../middlewares/error-handlers");

const initPassportFBStrategy = require("../auth/facebook-strategy");

const { isJWTAuth } = require("../middlewares/auth-middlewares");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send("Sideline API Service is running.....");
  });

  initPassportFBStrategy(app);

  const auth = require("./auth-routes");
  const user = require("./user-routes");

  app.use("/api/auth", auth);
  app.use("/api/user", isJWTAuth, user);

  app.use(notFoundResource);
  app.use(errorHandler);
};
