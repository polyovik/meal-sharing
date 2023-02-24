const { signedCookie } = require("cookie-parser");
const express = require("express");
const router = express.Router();
const knex = require("../../database");
const mealsController = require('../controllers/meals.controller')
/* 
router.get('/', mealsController.getAllMeals); */

router.post('/', mealsController.postNewMeal);

router.get('/:id', mealsController.getMealById);

router.put('/:id', mealsController.updateMealById);

router.delete('/:id', mealsController.deleteMeal);

router.get('/:meal_id/reviews', mealsController.getReviewByMeal);

router.get('/', mealsController.getFilteredMeal);






/* week1 hmwrk */

router.get("/future", async (request, response) => {
  try {
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const futureMeals = await knex("meals").select("*").where("when", ">", date);
    return response.json(futureMeals);
  } catch (error) {
    throw error;
  }
});


router.get("/past", async (request, response) => {
  try {
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const pastMeals = await knex("meals").select("*").where("when", "<", date);
    return response.json(pastMeals);
  } catch (error) {
    throw error;
  }
});

router.get("/all", async (request, response) => {
  try {
    const allMeals = await knex("meals").select("*");
    return response.json(allMeals);
  } catch (error) {
    throw error;
  }
});

router.get("/first", async (request, response) => {
  try {
    const firstMeal = await knex("meals").select("*").orderBy("id", "asc").first();
    if (firstMeal) {
      return response.json(firstMeal);
    } 
    return response.status(404).json({message:"Meal Not Found"})
  } catch (error) {
    throw error;
  }
});

router.get("/last", async (request, response) => {
  try {
    const lastMeal = await knex("meals").select("*").orderBy("id", "desc").first();
    if (lastMeal) {
      return response.json(lastMeal);
    }
    return response.status(404).json({message:"Meal Not Found"})
  } catch (error) {
    throw error;
  }
});

module.exports = router;
