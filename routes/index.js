const userRouter = require("./user.router");
const projectRouter = require("./project.router");
const ratingRouter = require("./rating.router");

function routes(app) {
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/projects", projectRouter);
  app.use("/api/v1/ratings", ratingRouter);
}

module.exports = routes;
