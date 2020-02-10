import axios from "axios";
const API_BASE = ' https://aiot-nodejs.herokuapp.com';

export const userLogin = params => {
  return axios
    .post(`${API_BASE}/api/v1/auth/login`, params)
    .then(e => e)
    .catch(e => e);
};

export const userRegister = params => {
  return axios
    .post(`${API_BASE}/api/v1/auth/register`, params)
    .then(e => e)
    .catch(e => e);
};

export const addProject = (params, token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return axios
    .post(`${API_BASE}/api/v1/project`, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    .then(e => e)
    .catch(e => e);
};


export const getProject = (token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return axios.get(`${API_BASE}/api/v1/project`)
    .then(e => e)
    .catch(e => e);
}