/* eslint-disable default-case */
export default function reducer(state={
    data: [],
    child: [],
    fetching: false,
    fetched: false,
    error: null,
    start:false,
    detail: null,
    detailStart: true,
    edit: false
},action){
    switch (action.type) {
        case "FETCH_ALL_CATEGORY":{
            return { ...state, fetching: true }
        }

        case "FETCH_CHILD_CATEGORY_BY_PARENT":{
            return { ...state, fetching: true }
        }

        case "ALL_CATEGORY_FULFILLED":{
            return{
                ...state,
                fetching: false,
                fetched: true,
                data: action.payload
            }
        }

        case "FETCH_ALL_CATEGORY_ADMIN":{
            return { ...state, start: true }
        }
        case "ALL_CATEGORY_ADMIN_FULFILLED" : {
            return { ...state, data: action.payload, start: false }
        }
        case "FETCH_CATEGORY_ADMIN_REJECTED": {
            return { ...state, data: action.payload, start: false }
        }

        case "CATEGORY_BY_ID_START":{
            return { ...state, detailStart: true }
        }
        case "CATEGORY_BY_ID_FULFILLED" : {
            return { ...state, detail: action.payload, detailStart: false }
        }
        case "CATEGORY_BY_ID_REJECTED": {
            return { ...state, detail: action.payload, detailStart: false }
        }

        case "EDIT_CATEGORY_START":{
            return { ...state, edit: true }
        }
        case "EDIT_CATEGORY_FULFILLED" : {
            return { ...state, ...action.payload, edit: false }
        }
        case "EDIT_CATEGORY_REJECTED": {
            return { ...state, ...action.payload, edit: false }
        }


        case "CHILD_CATEGORY_FULFILLED":{
            return{
                ...state,
                fetching: false,
                fetched: true,
                child: action.payload
            }
        }

        case "FETCH_CATEGORY_REJECTED":{
            return{
                ...state, fetching: false, 
                data: action.payload
            }
        }
    }

    return state;
};