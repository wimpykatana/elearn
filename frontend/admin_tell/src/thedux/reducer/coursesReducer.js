/* eslint-disable default-case */
export default function reducer(state={
    data: [],
    upload: [],
    poster: [],
    display: [],
    fetching: false,
    fetched: false,
    error: null,
}, action) {
    switch (action.type) {
        case "FETCH_ALL_COURSES":{
            return {...state, data:null, fetching: true}
        }
        case "ALL_COURSES_FULFILLED":{
            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.payload
            }
        }

        case "FETCH_DETAIL_COURSES":{
            return{
                ...state, fetching: true
            }
        }
        case "DETAIL_COURSES_FULFILLED":{
            return {
                ...state,
                fetching: false,
                fetched: true,
                detail: action.payload
            }
        }
        case "FETCH_DATA_REJECTED":{
            return{
                ...state, fetching: false, 
                data: action.payload
            }
        }

        case "ADD_COURSES_START":{
            return {
                ...state, 
                data: null
            }
        }
        case "ADD_COURSES_LOAD": {
            return {
                ...state,
                fetching: true,
                error: false,
                loaded: action.payload
            }
        }
        case "ADD_COURSES_SUCCEED": {
            return {
                ...state,
                fetching: true,
                error: false,
                detail: action.payload
            }
        }
        case "ADD_COURSES_FAILED":{
            return{
                ...state,
                error: true,
                fetching: true,
                data: action.payload
            }
        }

        //Video
        case  "BEGIN_UPLOAD_NEW_VIDEO":{
            return{
                ...state, fetching: true,
                upload: action.payload
            }
        }

        case "UPLOADING_NEW_VIDEO":{
            return{
                ...state,
                fetching: true,
                upload: action.payload
            }
        }

        case "UPLOAD_NEW_VIDEO_SUCCESS":{
            return{
                ...state,
                fetching: false,
                upload: action.payload
            }
        }

        //Video Poster
        case  "BEGIN_UPLOAD_NEW_VIDEO_POSTER":{
            return{
                ...state, fetching: true,
                poster: action.payload
            }
        }

        case "UPLOADING_NEW_VIDEO_POSTER":{
            return{
                ...state,
                fetching: true,
                poster: action.payload
            }
        }

        case "UPLOAD_NEW_VIDEO_POSTER_SUCCESS":{
            return{
                ...state,
                fetching: false,
                poster: action.payload
            }
        }

        //Display Image
        case  "BEGIN_UPLOAD_NEW_DISPLAY_IMAGE":{
            return{
                ...state, fetching: true,
                display: action.payload
            }
        }

        case "UPLOADING_NEW_DISPLAY_IMAGE":{
            return{
                ...state,
                fetching: true,
                display: action.payload
            }
        }

        case "UPLOAD_NEW_DISPLAY_IMAGE_SUCCESS":{
            return{
                ...state,
                fetching: false,
                display: action.payload
            }
        }
        
    }

    return state
}