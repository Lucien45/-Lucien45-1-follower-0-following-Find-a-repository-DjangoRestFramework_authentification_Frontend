import axios from 'axios';

// Django csrf token
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const Axios = axios.create({
    baseURL: 'http://localhost:8000'
});

export default Axios;
