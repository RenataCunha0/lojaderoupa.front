import axios from 'axios';

const api = axios.create({
    baseURL: 'https://lojaderoupa.herokuapp.com'
});

export default api;