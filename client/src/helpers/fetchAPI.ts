import axios from 'axios';

export const fetchAPI = async () => {
  const response = await axios.get('http://localhost:8080/api');
  return response.data.users;
};
