const express = require("express");
const ratingRouter = express.Router();

const RatingService = require("../services/rating.service");
const ratingService = new RatingService();

const validatorHandler = require("./../middleware/validatorHandler");
const {
  createRatingSchema,
  updatedRatingSchema,
  getRatingSchema,
} = require("./../schemas/rating.schema");

ratingRouter.get("/", async (req, res, next) => {
  try {
    const ratings = await ratingService.findAll();
    res.status(200).json(ratings);
  } catch (error) {
    next(error);
  }
});

ratingRouter.get(
  "/:id",
  validatorHandler(getRatingSchema, "params"),
  async (req, res, next) => {
    try {
      const { params } = req;
      const { id } = params;
      console.log(id);
      const rating = await ratingService.findOne(id);
      res.status(200).json(rating);
    } catch (error) {
      next(error);
    }
  }
);

ratingRouter.post(
  "/",
  validatorHandler(createRatingSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const { rate, userId, projectId } = body;
      const dataForRating = {
        rate,
        userId,
        projectId,
      };
      const savedRating = await ratingService.create(dataForRating);
      res.status(201).json(savedRating);
    } catch (error) {
      next(error);
    }
  }
);

ratingRouter.put(
  "/:id",
  validatorHandler(getRatingSchema, "params"),
  validatorHandler(updatedRatingSchema, "body"),
  async (req, res, next) => {
    try {
      const { params, body } = req;
      const { id } = params;
      const { rate, userId, projectId } = body;
      const dataForRating = {
        rate,
        userId,
        projectId,
      };
      const updatedRating = await ratingService.update(id, dataForRating);
      res.status(200).json(updatedRating);
    } catch (error) {
      next(error);
    }
  }
);

ratingRouter.delete(
  "/:id",
  validatorHandler(getRatingSchema, "params"),
  async (req, res, next) => {
    try {
      const { params } = req;
      const { id } = params;
      console.log(id);
      const ratingId = await ratingService.delete(id);
      res.status(204).json(ratingId);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = ratingRouter;
