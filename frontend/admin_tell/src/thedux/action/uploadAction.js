import config from '../../config/config.json';
import axios from 'axios';

export function upload(file, url, id, contentName){
    return function(dispatch){
        const data = new FormData();

        data.append('file', file, file.name);
        data.append('id', id);

        dispatch({type: "UPLOAD_IMG", payload: { beginUpload: true, loaded:0 }})

        axios.post(config.api+'/'+url, data, {
            onUploadProgress: ProgressEvent => {
                dispatch({type: "UPLOAD_IMG", payload: { beginUpload: true, loaded: (ProgressEvent.loaded / ProgressEvent.total*100) }})
            },
          })
          .then((res) => {
            dispatch({type: "UPLOAD_IMG_SUCCESS", payload:{ uploadIsSuccess:true , beginUpload:false, message: res.data.message, file: res.data.file }})
          })
          .catch((err)=>{
            dispatch({type: "UPLOAD_IMG_REJECTED", payload: err})
          })
    }
}
