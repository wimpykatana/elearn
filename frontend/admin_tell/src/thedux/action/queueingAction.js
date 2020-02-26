import config from '../../config/config.json';
import axios from 'axios';

export function getFFMPEGstatus(){
    return function(dispatch){
        dispatch({type: "FETCH_ALL_CATEGORY"});

        axios.get(config.api+"/queueing/ffmpeg")
            .then((res) => {
                dispatch({type: "ALL_CATEGORY_FULFILLED", payload: res.data.contents})

            })
            .catch((err) => {
                dispatch({type: "FETCH_CATEGORY_REJECTED", payload: err})

            })
    }
}
