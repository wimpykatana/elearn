/* eslint-disable default-case */
export default function reducer(state={
    dataSearch: [],
    data: [],
    start: false,
    submitSearch: false
}, action) {
    switch (action.type) {
        case "SEARCH_START":{
            return {
                ...state,
                start:true,
                data: []
            }
        }
        case "SEARCH_SUCCEED":{
            return {
                ...state,
                start: false,
                data: action.payload
            }
        }
        case "SEARCH_FAILED": {
            return {
                ...state,
                start: false,
                data: action.payload,
            }
        }

        case "SEARCH_START_SUBMIT":{
            return {
                ...state,
                submitSearch: true,
                dataSearch: []
            }
        }
        case "SEARCH_SUBMIT_SUCCEED":{
            return {
                ...state,
                submitSearch: false,
                dataSearch: action.payload
            }
        }
        case "SEARCH_SUBMIT_FAILED": {
            return {
                ...state,
                submitSearch: false,
                dataSearch: action.payload,
            }
        }
    }

    return state;
}

   