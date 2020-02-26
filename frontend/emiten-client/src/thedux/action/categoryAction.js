import config from '../../config/config.json';

export function fetchAllParentCategory(){
    return function(dispatch){
        dispatch({type: "FETCH_ALL_PARENT_CATEGORY"});

        fetch(config.api+"/category/0")
            .then(res => res.json())
            .then(json =>{
                dispatch({type: "ALL_PARENT_CATEGORY_FULFILLED", payload: json})

            })
            .catch((err) => {
                dispatch({type: "FETCH_DATA_REJECTED", payload: err})

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