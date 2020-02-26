/* eslint-disable default-case */
export default function reducer(state={
    start: false,
    data: null
}, action) {
    switch (action.type) {
        case "SEARCH_EMITEN_START":{
            return {
                ...state,
                start:true,
                data: null
            }
        }
        case "SEARCH_EMITEN_SUCCEED":{
            return {
                ...state,
                start: false,
                data: action.payload
            }
        }
        case "SEARCH_EMITEN_FAILED": {
            return {
                ...state,
                start: false,
                data: action.payload,
            }
        }

        case "LIST_EMITEN_START":{
            return {
                ...state,
                start:true,
                data: null
            }
        }
        case "LIST_EMITEN_SUCCEED":{
            return {
                ...state,
                start: false,
                data: action.payload
            }
        }
        case "LIST_EMITEN_FAILED": {
            return {
                ...state,
                start: false,
                data: action.payload,
            }
        }
    }

    return state;
}

   