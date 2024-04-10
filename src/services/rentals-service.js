import axios from 'axios';
import { globalConstants } from '../utils/constants';

const apiUrl = `${globalConstants.API_URL}/rentals`;

export async function getAllRentals() {
  return axios.get(apiUrl);
}

export async function getRentalById(id) {
  return axios.get(`${apiUrl}/${id}`);
}

export async function deleteRentalById(id) {
  return axios.delete(`${apiUrl}/${id}`);
}

export async function saveRental(rental) {
  if (rental.id) {
    return axios.put(`${apiUrl}/${rental.id}`, rental);
  }

  rental.isRented = false;
  return axios.post(apiUrl, rental);
}
