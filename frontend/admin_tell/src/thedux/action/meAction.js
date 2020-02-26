import config from '../../config/config.json';
import axios from 'axios';

export function getMe() {
    return function(dispatch) {
        dispatch({type: "FETCH_USER_ME"});

        axios.get(config.api+"/adminuser/me", {})
        .then((response) => {
            dispatch({type: "FETCH_USER_ME_FULFILLED", payload: response.data});
        })
        .catch((error) => {
            dispatch({type: "FETCH_USER_ME_FAILED", payload: error.response});
        });
    }
}

