const knex = require('../../database');
const reviewTableName = 'review'

const selectAllReviews = () => {
  return knex(reviewTableName).select('*');
};

const addNewReview = (newReviewData) => {
  return knex(reviewTableName).insert(newReviewData).into(reviewTableName);
};

const getReviewById = (reviewId) => {
  return knex(reviewTableName).where({ id: reviewId });
};

const updateReview = (reviewId, updatedReviewBody) => {
  return knex(reviewTableName).where({ id: reviewId }).update(updatedReviewBody);
};

const deleteReview = (reviewId, deletedReviewBody) => {
  return knex(reviewTableName).where({ id: reviewId }).del(deletedReviewBody);
};

module.exports = { selectAllReviews, addNewReview, getReviewById, updateReview, deleteReview };
