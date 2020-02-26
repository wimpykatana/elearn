/* eslint-disable default-case */
export default function reducer(state={
    data: null,
    start: false,
    loaded: 0,
}, action) {
    switch (action.type) {
        case  "UPLOAD_IMG":{
            return {
                ...state, 
                start: true,
                ...action.payload
            }
        }
        case "UPLOAD_IMG_SUCCESS":{
            return{
                ...state,
                start: false,
                ...action.payload
            }
        }
        case "UPLOAD_IMG_REJECTED":{
            return{
                ...state,
                start: false,
                ...action.payload
            }
        }
    }

    return state
}