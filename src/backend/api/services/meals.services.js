const knex = require('../../database');
const mealTableName = 'meal';
const reservationTableName = 'reservation';

const selectAllMealsQuery = () => {
  return knex(mealTableName);
};

const addNewMealQuery = (newMealData) => {
  return knex(mealTableName).insert(newMealData).into(mealTableName);
};

const getMealById = async (mealId) => {
  const meal = await knex(mealTableName).select('*').where({ id: mealId }).first();
  console.log(meal);

  return meal !== undefined ? meal : null
};

const updateMeal = (mealId, updatedMealBody) => {
  return knex(mealTableName).where({ id: mealId }).update(updatedMealBody);
};

const deleteMeal = (mealId, deletedMealBody) => {
  return knex(mealTableName).where({ id: mealId }).del(deletedMealBody);
};

const getReviewByMeal = (mealId) => {
  return knex(mealTableName).join('reviews', 'reviews.meal_id', '=', `${mealTableName}.id`).where('meal_id', '=', mealId);
};

const filterByQuery = (query) => {
  const limit = query.limit;
  const sortKey = query.sortKey;
  const sortDir = query.sortDir ? query.sortDir : 'asc';
  const title = query.title;
  const dateAfter = query.dateAfter;
  const dateBefore = query.dateBefore;
  const maxPrice = query.maxPrice;
  const availableReservations = query.availableReservations;

  let q = knex(mealTableName);

  if (title) {
    q.where('title', 'like', `%${title}%`);
  }

  if (dateAfter) {
    q.where('when', '>', `${dateAfter}`);
  }

  if (dateBefore) {
    q.where('when', '<', `${dateBefore}`);
  }

  if (maxPrice) {
    q.where('price', '<=', maxPrice);
  }

  if (sortKey /* && sortKey === 'when' || sortKey === 'max_reservations', sortKey === 'price' */) {
    q.orderBy(sortKey, sortDir);
  }

  if (limit) {
    q.limit(limit);
  }

  if (availableReservations) {
    q.select(
      `${mealTableName}.id as mealID`,
      `${reservationTableName}.id as reservationID`,
      `${reservationTableName}.number_of_guests`,
      `${mealTableName}.max_reservations`,
      `${mealTableName}.price`,
      `${mealTableName}.when`
    ).join(reservationTableName, `${reservationTableName}.meal_id`, '=', `${mealTableName}.id`);
  }
  console.log(q.toString());
  return q;
};

const getManyByIDs = (mealIdsArray) => {
  return knex(mealTableName).whereIn('id', mealIdsArray)
}


module.exports = {
  selectAllMealsQuery,
  addNewMealQuery,
  getMealById,
  updateMeal,
  deleteMeal,
  getReviewByMeal,

  filterByQuery,
  getManyByIDs
};
