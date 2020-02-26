import axios from 'axios';
import config from '../config/config.json';

export function auth () {
    return new Promise((resolve, reject) => {
        axios.get(`${config.auth}/gettoken`, { headers: {id: 'tell-client'}})
        .then((data) => {
            resolve(data.data.token);
        })
        .catch((error) => {
            if (!error.response) {
                return reject('Error: Network Error');
            }

            reject(error.response.data);
        })
    });
}
