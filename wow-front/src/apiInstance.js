import axios from 'axios';
export default function apiInstance() {
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: token
      ? { 'Authorization': `Bearer ${token}` }
      : {},
  });
}
