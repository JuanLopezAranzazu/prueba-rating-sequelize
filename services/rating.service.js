const { models } = require("../libs/sequelize");
const boom = require("@hapi/boom");
const { Op } = require("sequelize");

class RatingService {
  constructor() {}

  async findAll() {
    const ratings = await models.Rating.findAll({
      include: [
        { model: models.Project, as: "project" },
        { model: models.User, as: "user" },
      ],
    });
    return ratings;
  }

  async findOne(id) {
    const rating = await models.Rating.findOne({
      where: { id },
      include: [
        { model: models.Project, as: "project" },
        { model: models.User, as: "user" },
      ],
    });
    if (!rating) throw boom.notFound(`Rating #${id} not found`);
    return rating;
  }

  async create(payload) {
    const savedRating = await models.Rating.create(payload);
    return savedRating;
  }

  async update(id, payload) {
    const rating = await this.findOne(id);
    if (!rating) throw boom.notFound(`Rating #${id} not found`);
    const updatedRating = await rating.update(payload);
    return updatedRating;
  }

  async delete(id) {
    const rating = await this.findOne(id);
    if (!rating) throw boom.notFound(`Rating #${id} not found`);
    await rating.destroy();
    return id;
  }
}

module.exports = RatingService;
