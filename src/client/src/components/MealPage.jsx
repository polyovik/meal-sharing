import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate} from 'react-router-dom';
import mealsAPI from '../api/meals';


export default function MealPage() {
  const [meal, setMeal] = useState(null);
  const { id } = useParams();
  console.log(id);
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const foundMeal = await mealsAPI.getById(id);
        console.log(foundMeal);
        setMeal(foundMeal);
      } catch (error) {
        return navigate('/');
      }
    }
    fetchData();
  }, []);

  const content =
    meal !== null ? (
      <div>
        <Link to={'/meals'}>Back to meal list</Link>
        <h1>{meal.title}</h1>
      </div>
    ) : (
      <p>Please wait</p>
    );

  return content;
}
