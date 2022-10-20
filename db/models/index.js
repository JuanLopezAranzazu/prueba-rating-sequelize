const { User, UserSchema } = require("./user.model");
const { Project, ProjectSchema } = require("./project.model");
const { UserProject, UserProjectSchema } = require("./user-project.model");
const { Rating, RatingSchema } = require("./rating.model");

function models(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Project.init(ProjectSchema, Project.config(sequelize));
  UserProject.init(UserProjectSchema, UserProject.config(sequelize));
  Rating.init(RatingSchema, Rating.config(sequelize));
  User.associate(sequelize.models);
  Project.associate(sequelize.models);
  UserProject.associate(sequelize.models);
  Rating.associate(sequelize.models);
}

module.exports = models;
