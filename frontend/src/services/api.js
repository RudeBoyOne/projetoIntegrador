import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/',
  // baseURL: 'http://ec2-18-230-196-21.sa-east-1.compute.amazonaws.com:8080/',
});

export default api;
