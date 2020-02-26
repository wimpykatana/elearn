/* eslint-disable default-case */
export default function reducer(state={
    data: [],
    child: [],
    fetching: false,
    fetched: false,
    error: null,
},action){
    switch (action.type) {
        case "FETCH_ALL_PARENT_CATEGORY":{
            return { ...state, fetching: true }
        }

        case "FETCH_CHILD_CATEGORY_BY_PARENT":{
            return { ...state, fetching: true }
        }

        case "ALL_PARENT_CATEGORY_FULFILLED":{
            return{
                ...state,
                fetching: false,
                fetched: true,
                data: action.payload
            }
        }

        case "CHILD_CATEGORY_FULFILLED":{
            return{
                ...state,
                fetching: false,
                fetched: true,
                child: action.payload
            }
        }

        case "FETCH_DATA_REJECTED":{
            return{
                ...state, fetching: false, 
                data: action.payload
            }
        }
    }

    return state;
};