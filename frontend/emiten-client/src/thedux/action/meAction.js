import config from '../../config/config.json';
import axios from 'axios';

export function getMe() {
    return function(dispatch) {
        dispatch({type: "FETCH_USER_ME"});

        axios.get(config.api+"/user/me", {})
        .then((response) => {
            dispatch({type: "FETCH_USER_ME_FULFILLED", payload: response.data.user});
        })
        .catch((error) => {
            dispatch({type: "FETCH_USER_ME_FAILED", payload: error.response});
        });
    }
}

export function onlogin(username, pass){
    return function(dispatch){
        dispatch({type: "START_LOGIN"});

        axios.post(config.api+"/user/login", {
            username: username,
            password: pass
        })
        .then(json => {
            const data = json.data;

            dispatch({type: "LOGIN_SUCCES", payload: data.user});
            
        }).catch((error) => {
            if(error.response && error.response.data) {
                return dispatch({type: "LOGIN_REJECT", payload: error.response.data.details[0]});
            }
            
            return dispatch({type: "LOGIN_REJECT", payload: error.response});
        })
    }
}

export function logOut(token) {
    return function(dispatch) {
        dispatch({type: "LOGOUT_START"});

        axios.get(config.api+"/user/logout", {headers: {"Authorization" : `Bearer ${token}`} })
        .then((response) => {
            dispatch({type: "USER_LOGOUT_ALREADY", payload: response.data});
        })
        .catch((error) => {
            dispatch({type: "LOGOUT_FAILED", payload: error.response});
        });
    }
}
