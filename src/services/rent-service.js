import axios from 'axios';
import { globalConstants } from '../utils/constants';

const apiUrl = `${globalConstants.API_URL}/rents`;

export async function saveRent(rent) {
  return axios.post(apiUrl, rent);
}

export async function getUserRentsById(userId) {
  return axios.get(`${apiUrl}?userId=${userId}`);
}
