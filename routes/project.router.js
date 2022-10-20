const express = require("express");
const projectRouter = express.Router();

const ProjectService = require("../services/project.service");
const projectService = new ProjectService();

const validatorHandler = require("./../middleware/validatorHandler");
const {
  createProjectSchema,
  updateProjectSchema,
  getProjectSchema,
  createUserProjectSchema,
  queryProjectSchema,
} = require("./../schemas/project.schema");

projectRouter.get(
  "/",
  validatorHandler(queryProjectSchema, "query"),
  async (req, res, next) => {
    try {
      const projects = await projectService.findAll(req.query);
      res.status(200).json(projects);
    } catch (error) {
      next(error);
    }
  }
);

projectRouter.get(
  "/:id",
  validatorHandler(getProjectSchema, "params"),
  async (req, res, next) => {
    try {
      const { params } = req;
      const { id } = params;
      console.log(id);
      const project = await projectService.findOne(id);
      res.status(200).json(project);
    } catch (error) {
      next(error);
    }
  }
);

projectRouter.post(
  "/add",
  validatorHandler(createUserProjectSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const { userId, projectId } = body;
      const dataForUserProject = {
        userId,
        projectId,
      };
      const savedUserProject = await projectService.addUserProject(
        dataForUserProject
      );
      res.status(201).json(savedUserProject);
    } catch (error) {
      next(error);
    }
  }
);

projectRouter.post(
  "/",
  validatorHandler(createProjectSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const { name, description, status = "wait" } = body;
      const dataForProject = {
        name,
        description,
        status,
      };
      const savedProject = await projectService.create(dataForProject);
      res.status(201).json(savedProject);
    } catch (error) {
      next(error);
    }
  }
);

projectRouter.put(
  "/:id",
  validatorHandler(getProjectSchema, "params"),
  validatorHandler(updateProjectSchema, "body"),
  async (req, res, next) => {
    try {
      const { params, body } = req;
      const { id } = params;
      const { name, description, status = "wait" } = body;
      const dataForProject = {
        name,
        description,
        status,
      };
      const updatedProject = await projectService.update(id, dataForProject);
      res.status(200).json(updatedProject);
    } catch (error) {
      next(error);
    }
  }
);

projectRouter.delete(
  "/:id",
  validatorHandler(getProjectSchema, "params"),
  async (req, res, next) => {
    try {
      const { params } = req;
      const { id } = params;
      console.log(id);
      const projectId = await projectService.delete(id);
      res.status(204).json(projectId);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = projectRouter;
