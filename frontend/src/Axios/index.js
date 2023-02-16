import axios from 'axios';

const Axios = function () {
  const obj = {
    baseURL: 'http://localhost:8000',
    timeout: 0,
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return (axios.create(obj));
};

export default Axios;