import axios from 'axios';
import Cookies from 'js-cookie';

const Axios = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'multipart/form-data', // Puisque vous utilisez le MultiPartParser
        'X-CSRFToken': Cookies.get('csrftoken'),  // Ajoutez le jeton CSRF ici
    },
    withCredentials: true,  // Assurez-vous que les cookies (y compris le CSRF token) sont envoyés avec la requête
});

export default Axios;
