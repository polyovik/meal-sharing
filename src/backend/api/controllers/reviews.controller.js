const reviewService = require('../services/reviews.services');

const getAllReviews = async (request, response) => {
  try {
    const reviews = await reviewService.selectAllReviews();

    return response.json(reviews);
  } catch (error) {
    throw error;
  }
};

const postNewReview = async (request, response) => {
  try {
    const newReviewData = request.body;
    await reviewService.addNewReview(newReviewData);

    return response.status(201).json({ message: 'New review created.' });
  } catch (error) {
    throw error;
  }
};

const getReviewById = async (request, response) => {
  try {
    const reviewId = request.params.id;

    if (!reviewId) {
      return response.json({ message: 'No review with this id found' });
    }
    const review = await reviewService.getReviewById(reviewId);

    return response.json(review);
  } catch (error) {
    throw error;
  }
};

const updateReviewById = async (request, response) => {
  try {
    const reviewId = request.params.id;
    const reviewBody = request.body;
    if (!reviewId) {
      return response.json({ message: 'No review with this id found' });
    }

    await reviewService.updateReview(reviewId, reviewBody);

    return response.status(201).json({ message: 'Review updated' });
  } catch (error) {
    throw error;
  }
};

const deleteReview = async (request, response) => {
  try {
    const reviewId = request.params.id;
    const reviewBody = request.body;
    if (!reviewId) {
      return response.json({ message: 'No review with this id found' });
    }

    await reviewService.deleteReview(reviewId, reviewBody);

    return response.status(201).json({ message: 'Review deleted' });
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllReviews, postNewReview, getReviewById, updateReviewById, deleteReview };
