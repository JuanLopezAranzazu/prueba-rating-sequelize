const { Model, DataTypes, Sequelize } = require("sequelize");
const { USER_TABLE } = require("./user.model");
const { PROJECT_TABLE } = require("./project.model");
const USER_PROJECT_TABLE = "users_projects";

const UserProjectSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  projectId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PROJECT_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
};

class UserProject extends Model {
  static associate(models) {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_PROJECT_TABLE,
      modelName: "UserProject",
      timestamps: false,
    };
  }
}
module.exports = { UserProject, UserProjectSchema, USER_PROJECT_TABLE };
