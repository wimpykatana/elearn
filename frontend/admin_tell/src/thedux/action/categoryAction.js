import config from '../../config/config.json';
import axios from 'axios';

export function getAllCategories(){
    return function(dispatch){
        dispatch({type: "FETCH_ALL_CATEGORY"});

        axios.get(config.api+"/category/")
            .then((res) => {
                dispatch({type: "ALL_CATEGORY_FULFILLED", payload: res.data.contents})

            })
            .catch((err) => {
                dispatch({type: "FETCH_CATEGORY_REJECTED", payload: err})

            })
    }
}

export function getAllCategoriesAdmin(){
    return function(dispatch){
        dispatch({type: "FETCH_ALL_CATEGORY_ADMIN"});

        axios.get(config.api+"/admin/category/")
            .then((res) => {
                dispatch({type: "ALL_CATEGORY_ADMIN_FULFILLED", payload: res.data.contents})

            })
            .catch((err) => {
                dispatch({type: "FETCH_CATEGORY_ADMIN_REJECTED", payload: err})

            })
    }
}

export function fetchChildCategory(parentId){
    return function(dispatch){
        dispatch({type: "FETCH_CHILD_CATEGORY_BY_PARENT"});

        if(parentId){
            fetch(config.api+"/category/"+parentId)
            .then(res => res.json())
            .then(json =>{
                dispatch({type: "CHILD_CATEGORY_FULFILLED", payload: json})
            })
            .catch((err) => {
                dispatch({type: "FETCH_DATA_REJECTED", payload: err})

            })
        }
        
    }
}

export function categoryById(id) {
    return function(dispatch){
        dispatch({type: "CATEGORY_BY_ID_START"});

        axios.get(config.api+"/category/"+id)
            .then((res) => {console.log("di action", res.data)
                dispatch({type: "CATEGORY_BY_ID_FULFILLED", payload: res.data.data})

            })
            .catch((err) => {
                dispatch({type: "CATEGORY_BY_ID_REJECTED", payload: err})

            })
    }
}

export function editCategory(data) {
    return function(dispatch){
        dispatch({type: "EDIT_CATEGORY_START"});

        axios.put(config.api+"/category/update", data)
            .then((res) => {
                dispatch({type: "EDIT_CATEGORY_FULFILLED", payload: res.data.data})

            })
            .catch((err) => {
                dispatch({type: "EDIT_CATEGORY_REJECTED", payload: err})

            })
    }
}