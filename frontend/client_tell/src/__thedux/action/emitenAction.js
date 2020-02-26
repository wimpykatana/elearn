
import config from '../../config/config.json';
import axios from 'axios';

export function search(text, token) {
    return function(dispatch) {
        return new Promise((resolve, reject) => {
            dispatch({type: 'SEARCH_EMITEN_START'});

            let data;

            if(token !== '') {
                data = {
                    token: token,
                    text: text
                }
            } else {
                data = {
                    text: text
                }
            }

            axios.post(config.api+"/emiten", data)
            .then(json => {
                dispatch({type: "SEARCH_EMITEN_SUCCEED", payload: json.data});
                resolve(json.data)
            })
            .catch((err) => {
                dispatch({type: "SEARCH_EMITEN_FAILED", payload: []});
                reject([]);
            })
        });
    }
}

export function list(text, token) {
    return function(dispatch) {
        return new Promise((resolve, reject) => {
            dispatch({type: 'LIST_EMITEN_START'});

            let data;

            if(token !== '') {
                data = {
                    token: token,
                    text: text
                }
            } else {
                data = {
                    text: text
                }
            }

            axios.get(config.api+"/emiten", data)
            .then(json => {
                dispatch({type: "LIST_EMITEN_SUCCEED", payload: json.data});
                resolve(json.data)
            })
            .catch((err) => {
                dispatch({type: "LIST_EMITEN_FAILED", payload: []});
                reject([]);
            })
        });
    }
}
