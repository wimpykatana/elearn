/* eslint-disable default-case */
export default function reducer(state={
    data: null,
    data2: null,
    detail:null,
    error: null,
}, action) {
    switch (action.type) {
        case "FETCH_ALL_FETCH_ALL_CATEGORY":{
            return {...state}
        }
        case "FETCH_ALL_CATEGORY_FULFILLED":{
            return {
                ...state,
                data: action.payload,
                error: false
            }
        }
        case "FETCH_DATA_CATEGORY_REJECTED":{
            return{
                ...state,
                data: action.payload,
                error: true
            }
        }

        case "FETCH_CATEGORY_BY_ID_START": {
            return {...state}
        }

        case "FETCH_CATEGORY_BY_ID_FULFILLED":{
            return {
                ...state,
                detail: action.payload,
                error: false
            }
        }
        case "FETCH_CATEGORY_BY_ID_REJECTED":{
            return{
                ...state,
                detail: action.payload,
                error: true
            }
        }

      case "FETCH_CATEGORY_BY_NAME_START": {
        return {...state}
      }

      case "FETCH_CATEGORY_BY_NAME_FULFILLED":{
        return {
          ...state,
          detail: action.payload,
          error: false
        }
      }
      case "FETCH_CATEGORY_BY_NAME_REJECTED":{
        return{
          ...state,
          detail: action.payload,
          error: true
        }
      }

        case "FETCH_ALL_FETCH_ALL_CATEGORY_CONTENT":{
            return {...state}
        }
        case "FETCH_ALL_CATEGORY_CONTENT_FULFILLED":{
            return {
                ...state,
                data2: action.payload,
                error: false
            }
        }
        case "FETCH_DATA_CATEGORY_CONTENT_REJECTED":{
            return{
                ...state,
                data2: action.payload,
                error: true
            }
        }
    }

    return state;
}
