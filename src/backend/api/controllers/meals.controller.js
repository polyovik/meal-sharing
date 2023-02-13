const mealService = require('../services/meals.services');

const getAllMeals = async (request, response) => {
  try {
    const meals = await mealService.selectAllMealsQuery();

    return response.json(meals);
  } catch (error) {
    throw error;
  }
};

const postNewMeal = async (request, response) => {
  try {
    const newMealData = request.body;
    await mealService.addNewMealQuery(newMealData);

    return response.status(201).json({ message: 'New meal created.' });
  } catch (error) {
    throw error;
  }
};

const getMealById = async (request, response) => {
  try {
    const mealId = request.params.id;

    if (!mealId) {
      return response.json({ message: 'No meal with this id found' });
    }

    const meal = await mealService.getMealById(mealId);

    return response.json(meal);
  } catch (error) {
    throw error;
  }
};

const updateMealById = async (request, response) => {
  try {
    const mealId = request.params.id;
    const mealBody = request.body;
    if (!mealId) {
        return response.json({ message: 'No meal with this id found' });
      }

    await mealService.updateMeal(mealId, mealBody);

    return response.status(201).json({ message: 'Meal updated' });
  } catch (error) {
    throw error;
  }
};

const deleteMeal = async (request, response) => {
  try {
    const mealId = request.params.id;
    const mealBody = request.body;
    if (!mealId) {
        return response.json({ message: 'No meal with this id found' });
      }
       
    await mealService.deleteMeal(mealId, mealBody);

    return response.status(201).json({ message: 'Meal deleted' });
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllMeals, postNewMeal, getMealById, updateMealById, deleteMeal };
