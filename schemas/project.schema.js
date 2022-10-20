const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string();
const description = Joi.string();
const status = Joi.string().valid("wait", "making", "finished");
const userId = Joi.number().integer();
const projectId = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createProjectSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  status: status.required(),
});

const createUserProjectSchema = Joi.object({
  userId: userId.required(),
  projectId: projectId.required(),
});

const updateProjectSchema = Joi.object({
  name: name,
  description: description,
  status: status,
});

const getProjectSchema = Joi.object({
  id: id.required(),
});

const queryProjectSchema = Joi.object({
  limit,
  offset,
});

module.exports = {
  createProjectSchema,
  createUserProjectSchema,
  updateProjectSchema,
  getProjectSchema,
  queryProjectSchema,
};
