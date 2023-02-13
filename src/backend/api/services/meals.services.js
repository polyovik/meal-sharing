const knex = require('../../database');

const selectAllMealsQuery = () => {
  return knex('meals').select('*');
};

const addNewMealQuery = (newMealData) => {
  return knex('meals').insert(newMealData).into('meals');
};

const getMealById = (mealId) => {
  return knex('meals').select('*').where({ id: mealId });
};

const updateMeal = (mealId, updatedMealBody) => {
  return knex('meals').where({ id: mealId }).update(updatedMealBody);
};

const deleteMeal = (mealId, deletedMealBody) => {
  return knex('meals').where({ id: mealId }).del(deletedMealBody);
};

module.exports = { selectAllMealsQuery, addNewMealQuery, getMealById, updateMeal, deleteMeal };
