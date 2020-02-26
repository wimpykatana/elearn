/* eslint-disable default-case */
export default function reducer(state={
    data: null,
    fetching: false,
    fetched: false,
    error: null,
},action){
    switch (action.type) {
        case "GET_FFMPEG_STATUS":{
            return { ...state}
        }
        case "GET_FFMPEG_STATUS_FINISH":{
            return{
                ...state,
                error: false,
                data: action.payload
            }
        }
        case "GET_FFMPEG_STATUS_REJECT":{
            return{
                ...state,
                error: true,
                data: action.payload
            }
        }
    }

    return state;
};