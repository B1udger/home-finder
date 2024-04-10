import axios from 'axios';
import { globalConstants } from '../utils/constants';

const apiUrl = `${globalConstants.API_URL}/users`;

export async function getAllUsers() {
  return axios.get(apiUrl);
}

export async function getUserById(id) {
  return axios.get(`${apiUrl}/${id}`);
}

export async function deleteUser(id) {
  return axios.delete(`${apiUrl}/${id}`);
}

export async function saveUser(user) {
  if (!user.picture) {
    user.picture = `https://picsum.photos/200/300?random=${Math.random()}`;
  }

  getAllUsers().then((res) => {
    const users = res.data;
    const existingUser = users.find((u) => u.email === user.email);

    if (existingUser) {
      throw new Error('Email already taken.');
    }

    if (user.id) {
      return axios.put(`${apiUrl}/${user.id}`, user);
    }

    return axios.post(`${apiUrl}`, user);
  });
}

export async function login(user) {
  const users = (await getAllUsers()).data;

  const foundUser = users.find(
    (u) => u.email === user.email && u.password === user.password
  );

  if (!foundUser) {
    throw new Error('Invalid username or password');
  }

  localStorage.setItem(
    globalConstants.LOGGED_USER_KEY,
    JSON.stringify(foundUser)
  );

  return foundUser;
}

export function logout() {
  localStorage.removeItem(globalConstants.LOGGED_USER_KEY);
}

export function getLoggedUser() {
  return JSON.parse(localStorage.getItem(globalConstants.LOGGED_USER_KEY));
}
