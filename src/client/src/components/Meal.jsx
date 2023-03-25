import React from 'react';
import { Link } from 'react-router-dom';

export default function Meal(props) {
  const meal = props.meal;

  return (
    <div className="meal-container">
      <Link to={`/meals/${meal.id}`}><h1>{meal.title}</h1></Link>
      <p>{meal.description}</p>
      <h3>${meal.price}</h3>
    </div>
  );
}
