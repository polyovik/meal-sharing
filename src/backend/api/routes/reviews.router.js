const { signedCookie } = require("cookie-parser");
const express = require("express");
const router = express.Router();
const knex = require("../../database");
const reviewsController = require('../controllers/reviews.controller')

router.get('/', reviewsController.getAllReviews);

router.post('/', reviewsController.postNewReview);

router.get('/:id', reviewsController.getReviewById);

router.put('/:id', reviewsController.updateReviewById);

router.delete('/:id', reviewsController.deleteReview);