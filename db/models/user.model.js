const { Model, DataTypes, Sequelize } = require("sequelize");
const USER_TABLE = "user";

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  fullname: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class User extends Model {
  static associate(models) {
    this.belongsToMany(models.Project, {
      as: "projects",
      through: models.UserProject,
      foreignKey: "userId",
      otherKey: "projectId",
    });

    this.hasMany(models.Rating, {
      foreignKey: "userId",
      as: "ratings",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: "User",
      timestamps: false,
    };
  }
}

module.exports = { USER_TABLE, UserSchema, User };
