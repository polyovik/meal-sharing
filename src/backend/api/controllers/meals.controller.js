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

const getReviewByMeal = async (request, response) => {
  try {
    const mealId = request.params.id;

    if (!mealId) {
      return response.json({ message: 'No meal with this id found' });
    }

    const reviews = await mealService.getReviewByMeal(mealId);

    return response.json(reviews);
  } catch (error) {
    throw error;
  }
};

const getFilteredMeal = async (request, response) => {
  try {
    if (request.query.maxPrice) {
      const maxPrice = Number(request.query.maxPrice);
      if (isNaN(maxPrice)) {
        return response.status(400).json({ message: 'Invalid Max Price Field' });
      }

      request.query.maxPrice = maxPrice;
    }

    if ((!request.query.sortKey === 'when' || !request.query.sortKey === 'max_reservations', !request.query.sortKey === 'price')) {
      return response.status(400).json({ message: 'Invalid sorting key' });
    }

    const filteredMeals = await mealService.filterByQuery(request.query);

    if (request.query.availableReservations) {
      const uniqueMealIds = [...new Set(filteredMeals.map((meal) => meal.mealID))];

      const mealsIdByReservation = uniqueMealIds
        .map((mealId) => {
          const mealsReservations = filteredMeals.filter((mealData) => mealData.mealID === mealId);
          const summOfGuests =
            mealsReservations.length === 1
              ? mealsReservations[0].number_of_guests
              : mealsReservations.reduce((acc, reservation) => acc.number_of_guests + reservation.number_of_guests);
          if (mealsReservations.length === 0) {
            return mealId;
          }
          const maxReservations = mealsReservations[0].max_reservations;

          if (summOfGuests <= maxReservations) {
            return mealId;
          }
          return null;
        })
        .filter((id) => id !== null);
      const meals = await mealService.getManyByIDs(mealsIdByReservation);

      return response.json(meals);
    }

    return response.json(filteredMeals);
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllMeals, postNewMeal, getMealById, updateMealById, deleteMeal, getReviewByMeal, getFilteredMeal };
