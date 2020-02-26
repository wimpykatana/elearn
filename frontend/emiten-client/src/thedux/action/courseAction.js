import config from '../../config/config.json';
import axios from 'axios';

export function uploadVideo(file, me) { console.log('ini props the dux => ', me);
    return function(dispatch){
        const data = new FormData();
        console.log('ini data upload', data)
        data.append('file', file, file.name)
        dispatch({type: "BEGIN_UPLOAD_NEW_VIDEO",payload: { beginUpload: true }})

        axios
          .post(config.api+"/user/upload", data, {
            headers: {'Authorization': "bearer " + me.data.user.token},
            onUploadProgress: ProgressEvent => {
                dispatch({type: "UPLOADING_NEW_VIDEO",payload: { beginUpload: true, loaded: (ProgressEvent.loaded / ProgressEvent.total*100) }})
            },
          })
          .then((res) => {
            dispatch({type: "UPLOAD_NEW_VIDEO_SUCCESS", payload:{ uploadIsSuccess:true , beginUpload:false, message: res.data.message, file: res.data.file }})
          })
          .catch((err)=>{
            dispatch({type: "FETCH_DATA_REJECTED", payload: err})
          })
    }
}

export function uploadVideoPoster(file){
    return function(dispatch){
        const data = new FormData();
        data.append('file', file, file.name)
        dispatch({type: "BEGIN_UPLOAD_NEW_VIDEO_POSTER",payload: { beginUpload: true }})

        axios
          .post(config.api+"/c/uploadvideoposter", data, {
            onUploadProgress: ProgressEvent => {
                dispatch({type: "UPLOADING_NEW_VIDEO_POSTER",payload: { beginUpload: true, loaded: (ProgressEvent.loaded / ProgressEvent.total*100) }})
            },
          })
          .then((res) => {
            dispatch({type: "UPLOAD_NEW_VIDEO_POSTER_SUCCESS", payload:{ uploadIsSuccess:true , beginUpload:false, message: res.data.message, file: res.data.file }})
          })
          .catch((err)=>{
            dispatch({type: "FETCH_DATA_REJECTED", payload: err})
          })
    }
}

export function uploadDisplayImage(file){
    return function(dispatch){
        const data = new FormData();
        data.append('file', file, file.name)
        dispatch({type: "BEGIN_UPLOAD_NEW_DISPLAY_IMAGE",payload: { beginUpload: true }})

        axios
          .post(config.api+"/c/uploaddisplayimage", data, {
            onUploadProgress: ProgressEvent => {
                dispatch({type: "UPLOADING_NEW_DISPLAY_IMAGE",payload: { beginUpload: true, loaded: (ProgressEvent.loaded / ProgressEvent.total*100) }})
            },
          })
          .then((res) => {
            dispatch({type: "UPLOAD_NEW_DISPLAY_IMAGE_SUCCESS", payload:{ uploadIsSuccess:true , beginUpload:false, message: res.data.message, file: res.data.file }})
          })
          .catch((err)=>{
            dispatch({type: "FETCH_DATA_REJECTED", payload: err})
          })
    }
}