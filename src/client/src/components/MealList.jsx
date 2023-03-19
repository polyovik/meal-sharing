import React, { useState, useEffect } from 'react';
import mealsAPI from '../api/meals';

export default function MealList() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await mealsAPI.getAll();
      console.log(res);
      setMeals(res);
    }
    fetchData();
  }, []);
  return (
    <div className='meals-container'>
      {meals.map((meal) => (
        <div className='meal-container' key={meal.id}>
          <h1>{meal.title}</h1>
          <p>{meal.description}</p>
          <h3>${meal.price}</h3>
        </div>
      ))}
    </div>
  );
}
