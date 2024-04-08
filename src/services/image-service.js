import axios from 'axios';
import { globalConstants } from '../utils/constants';

const apiUrl = 'https://api.cloudinary.com/v1_1/dbphswmvf/image/upload';

const dbUrl = `${globalConstants.API_URL}/images`;

export async function postImageToAPI(formData) {
  return axios.post(apiUrl, formData);
}

export async function saveImageInDb(image) {
  return axios.post(dbUrl, image);
}

export async function getImagesByRentalId(id) {
  return axios.get(`${dbUrl}?rentalId=${id}`);
}

export async function deleteImageById(id) {
  return axios.delete(`${dbUrl}/${id}`);
}
