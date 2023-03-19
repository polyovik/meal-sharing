import axios from 'axios';
const rootHost = 'http://localhost:5000/api/meals';

const getAll = async () => {
  const meals = await axios.get(`${rootHost}/`);
  
  return meals.data
};

export default { getAll };
