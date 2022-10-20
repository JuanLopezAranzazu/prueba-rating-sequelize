const { Model, DataTypes, Sequelize } = require("sequelize");
const RATING_TABLE = "rating";
const { USER_TABLE } = require("./user.model");
const { PROJECT_TABLE } = require("./project.model");

const RatingSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  rate: {
    allowNull: false,
    type: DataTypes.DOUBLE,
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
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class Rating extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });

    this.belongsTo(models.Project, {
      foreignKey: "projectId",
      as: "project",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: RATING_TABLE,
      modelName: "Rating",
      timestamps: false,
    };
  }
}

module.exports = { RATING_TABLE, RatingSchema, Rating };
