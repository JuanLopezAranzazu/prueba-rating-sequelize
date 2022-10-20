const { Model, DataTypes, Sequelize } = require("sequelize");
const PROJECT_TABLE = "project";

const ProjectSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  totalRating: {
    type: DataTypes.VIRTUAL,
    get() {
      if (this.ratings && this.ratings.length > 0) {
        const total = this.ratings.reduce((total, item) => {
          return total + item.rate;
        }, 0);
        return total / this.ratings.length;
      }
      return 0;
    },
  },
};

class Project extends Model {
  static associate(models) {
    this.hasMany(models.Rating, {
      foreignKey: "projectId",
      as: "ratings",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: PROJECT_TABLE,
      modelName: "Project",
      timestamps: false,
    };
  }
}

module.exports = { PROJECT_TABLE, ProjectSchema, Project };
