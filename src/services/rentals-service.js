import axios from 'axios';
import { globalConstants } from '../utils/constants';

const apiUrl = `${globalConstants.API_URL}/rentals`;

export function getAllRentals() {
  return axios.get(apiUrl);
}

export function getRentalById(id) {
  return axios.get(`${apiUrl}/${id}`);
}

export function deleteRentalById(id) {
  return axios.delete(`${apiUrl}/${id}`);
}

export function saveRental(rental) {
  if (rental.id) {
    return axios.put(`${apiUrl}/${rental.id}`);
  }

  return axios.post(apiUrl, rental);
}
