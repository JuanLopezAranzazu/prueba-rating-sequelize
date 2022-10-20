const Joi = require("joi");

const id = Joi.number().integer();
const rate = Joi.number().min(1.0).max(5.0);
const userId = Joi.number().integer();
const projectId = Joi.number().integer();

const createRatingSchema = Joi.object({
  rate: rate.required(),
  userId: userId.required(),
  projectId: projectId.required(),
});

const updatedRatingSchema = Joi.object({
  rate: rate,
  userId: userId,
  projectId: projectId,
});

const getRatingSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createRatingSchema,
  updatedRatingSchema,
  getRatingSchema,
};
