import config from '../../config/config.json';
import axios from 'axios';

export function fetchAllCategory(){
    return async function(dispatch) {
        try {
            dispatch({type: "FETCH_ALL_CATEGORY"});
 
            const category = await axios.get(`${config.api}/category`);

            dispatch({type: "FETCH_ALL_CATEGORY_FULFILLED", payload: category.data.contents});

        } catch(err) {
            dispatch({type: "FETCH_DATA_CATEGORY_REJECTED", payload: err.response.data});
        }
    }
}

export function fetchAllCategoryAndContents(){
    return async function(dispatch) {
        try {
            dispatch({type: "FETCH_ALL_CATEGORY_CONTENT"});
 
            const category = await axios.get(`${config.api}/categorycontent`);

            dispatch({type: "FETCH_ALL_CATEGORY_CONTENT_FULFILLED", payload: category.data.contents});

        } catch(err) {
            dispatch({type: "FETCH_DATA_CATEGORY_CONTENT_REJECTED", payload: err.response.data});
        }
    }
}

export function fetchCategoryById(id){
    return async function(dispatch) {
        try {
            dispatch({type: "FETCH_CATEGORY_BY_ID_START"});
 
            const category = await axios.get(`${config.api}/category/${id}`);

            dispatch({type: "FETCH_CATEGORY_BY_ID_FULFILLED", payload: category.data.data});

        } catch(err) {
            dispatch({type: "FETCH_CATEGORY_BY_ID_REJECTED", payload: err.response.data});
        }
    }
}

export function fetchCategoryByName(id) {
  return async function(dispatch) {
      try{
        dispatch({type: "FETCH_CATEGORY_BY_NAME_START"});

        const categoryname = await axios.get(`${config.api}/categoryByName/${id}`);

        dispatch({type: "FETCH_CATEGORY_BY_NAME_FULFILLED", payload: categoryname.data.data});

      }catch (err) {
        dispatch({type: "FETCH_CATEGORY_BY_NAME_REJECTED", payload: err.response});
      }
  }
}
