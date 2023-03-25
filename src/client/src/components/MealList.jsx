import React, { useState, useEffect } from 'react';
import mealsAPI from '../api/meals';
import Meal from "./Meal";

export default function MealList() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await mealsAPI.getAll();
        setMeals(res);
      } catch (error) {
        return navigate('/');
      }
    }
    fetchData();
  }, []);

  return (
    <div className='meals-container' >
      {meals.map((meal) => (
        <div key={meal.id}>
            <Meal meal={meal}/>
        </div>
      ))}
    </div>
  );
}
