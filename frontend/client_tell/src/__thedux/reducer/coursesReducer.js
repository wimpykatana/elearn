/* eslint-disable default-case */
export default function reducer(state={
    data: null,
    list: [],
    fetching: false,
    fetched: false,
    error: null,
    rateMessage: null,
    israted: null
}, action) {
    switch (action.type) {
        case "FETCH_ALL_COURSES":{
            return {...state, fetching: true}
        }
        case "FETCH_ALL_COURSES_FULFILLED":{
            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.payload,
                error: false
            }
        }
        case "FETCH_ALL_COURSES_REJECTED":{
            return{
                ...state, fetching: false,
                data: action.payload,
                error: true
            }
        }

        case "FETCH_COURSES_BY_PAGE":{
            return {...state, fetching: true}
        }


        case "FETCH_COURSES_BY_PAGE_FULFILLED":{
            return {
                ...state,
                fetching: false,
                fetched: true,
                list: action.payload,
                error: false
            }
        }

        case "FETCH_DATA_REJECTED":{
            return{
                ...state, fetching: false,
                data: action.payload,
                error: true
            }
        }

        case "FETCH_COURSES_BY_CATEGORY":{
            return {...state, fetching: true, data:null}
        }

        case "FETCH_COURSES_BY_CATEGORY_FULFILLED":{
            return {...state, data: action.payload.contents, page:action.payload.page, totalContent:action.payload.totalContent, fetching: true, error: false}
        }

        case "FETCH_COURSES_BY_CATEGORY_REJECTED":{
            return{
                ...state, fetching: false,
                data: action.payload,
                error: true
            }
        }

        case "FETCH_DETAIL_COURSES":{
            return{
                ...state, fetching: true, fetched: false
            }
        }
        case "FETCH_DETAIL_COURSES_FULFILLED":{
            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.payload,
                error: false
            }
        }

        case "USER_BEGIN_RATE_VIDEO":{
            return{
                ...state,
                fetching: true,
                fetched: false,
            }
        }

        case "RATE_VIDEO":{
            return{
                ...state,
                fetching: false,
                fetched: true,
                rateMessage: action.payload.message
            }
        }

        case "RATE_VIDEO_SUCCESS":{
            return{
                ...state,
                fetching: false,
                fetched: true,
                rateMessage: action.payload.message
            }
        }

        case "RATE_VIDEO_REJECT":{
            return{
                ...state,
                fetching: false,
                fetched: true,
                message: action.payload.message
            }
        }

        case "BEGIN_CHECK_USER_RATED":{
            return{
                ...state,
                fetching: false,
                fetched: true,
            }
        }

        case "CHECK_USER_RATED":{
            return{
                ...state,
                fetching: true,
                fetched: false,
                israted: action.payload
            }
        }

        case "CHECK_USER_RATED_SUCCESS":{
            return{
                ...state,
                fetching: true,
                fetched: false,
                israted: action.payload
            }
        }

        case "CHECK_USER_RATED_REJECT":{
            return{
                ...state,
                fetching: true,
                fetched: false,
                israted: action.payload
            }
        }

    }

    return state
}
