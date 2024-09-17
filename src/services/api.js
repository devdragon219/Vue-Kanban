import axios from 'axios';

export const getTicketsAndUsers = () => {
  return axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
    .then(response => response.data)
    .catch(error => {
      console.error("There was an error fetching the data!", error);
    });
};
