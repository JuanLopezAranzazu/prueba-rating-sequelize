const { models } = require("../libs/sequelize");
const boom = require("@hapi/boom");
const { Op } = require("sequelize");

class ProjectService {
  constructor() {}

  async findAll(query) {
    const options = {
      include: [{ model: models.Rating, as: "ratings" }],
    };
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    const projects = await models.Project.findAll(options);
    return projects;
  }

  async findOne(id) {
    const project = await models.Project.findOne({
      where: { id },
      include: [{ model: models.Rating, as: "ratings" }],
    });
    if (!project) throw boom.notFound(`Project #${id} not found`);
    return project;
  }

  async addUserProject(payload) {
    const newUserProject = await models.UserProject.create(payload);
    return newUserProject;
  }

  async create(payload) {
    const savedProject = await models.Project.create(payload);
    return savedProject;
  }

  async update(id, payload) {
    const project = await this.findOne(id);
    if (!project) throw boom.notFound(`Project #${id} not found`);
    const updatedProject = await project.update(payload);
    return updatedProject;
  }

  async delete(id) {
    const project = await this.findOne(id);
    if (!project) throw boom.notFound(`Project #${id} not found`);
    await project.destroy();
    return id;
  }
}

module.exports = ProjectService;
