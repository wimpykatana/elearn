
import config from '../../config/config.json';
import axios from 'axios';

let run = false;
let run2 = false;

export function search(text, query, token) {
    if(run) {
        return function() {
            console.log("Loading....")
        }
    }

    return function(dispatch) {
        run = true;
        return new Promise((resolve, reject) => {
            dispatch({type: 'SEARCH_START'});

            let data;

            if(token !== '') {
                data = {
                    token: token,
                    search: text,
                    search2:query
                }
            } else {
                data = {
                    search: text,
                    search2:query
                }
            }

            axios.post(config.api+"/course/search", data)
            .then(json => {
                run = false;
                dispatch({type: "SEARCH_SUCCEED", payload: json.data});
                resolve(json.data)
            })
            .catch((err) => {
                run = false;
                dispatch({type: "SEARCH_FAILED", payload: []});
                reject([]);
            })
        });
    }
}

export function searchSubmit(text, categoryIds, contentIds, triggerBy, token) {
    if(run2) {
        return function() {
            console.log("Loading2....")
        }
    }

    return function(dispatch){
        run2 = true;
        return new Promise((resolve, reject) => {
            if(typeof triggerBy === 'string') {
                dispatch({type: 'SEARCH_START_SUBMIT'});
                let data;
    
                if(token !== '') {
                    data = {
                        token: token,
                        search: text,
                        search2: categoryIds,
                        search3: contentIds
                    }
                } else {
                    data = {
                        search: text,
                        search2: categoryIds,
                        search3: contentIds
                    }
                }
    
                axios.post(config.api+"/course/search", data)
                .then(json => {
                    run2 = false;
                    localStorage.setItem("searchCourseId", null)
                    localStorage.setItem("searchCategoryIds", "[]")
                    localStorage.getItem("searchKey", "");

                    dispatch({type: "SEARCH_SUBMIT_SUCCEED", payload: json.data});
                    resolve(json.data);
                })
                .catch((err) => {
                    run2 = false;
                    localStorage.setItem("searchCourseId", null)
                    localStorage.setItem("searchCategoryIds", "[]")
                    localStorage.getItem("searchKey", "");

                    dispatch({type: "SEARCH_SUBMIT_FAILED", payload: []});
                    reject([]);
                })
            }
        });
    }
}