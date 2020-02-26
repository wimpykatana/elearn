import config from '../../config/config.json';
import axios from 'axios';

export function fetchAllCourses(){
    return function(dispatch) {
        dispatch({type: "FETCH_ALL_COURSES"});

        axios.get(config.api+"/course/")
            .then(res => {
                dispatch({type: "ALL_COURSES_FULFILLED", payload: res.data.contents})
            })
            .catch((err) => {
                dispatch({type: "FETCH_DATA_REJECTED", payload: err})
            })
    }
}

export function getDetailCourse(id){
    return function(dispatch){
        dispatch({type: "FETCH_DETAIL_COURSES"});

        axios.get(config.api+"/course/"+id).then(res => {
          dispatch({type: "DETAIL_COURSES_FULFILLED", payload: res.data.content})
        })
        .catch((err) => {
            dispatch({type: "FETCH_DATA_REJECTED", payload: err})
        })

    }
}

export function addCourse(content, admin){

  return function(dispatch){
      dispatch({type: "ADD_COURSES_START"});

      const data = new FormData();
      data.append('video', content.video, content.video.name);
      data.append('imgPre', content.imgPre, content.imgPre.name);
      data.append('imgDisplay', content.imgDisplay, content.imgDisplay.name);
      data.append('title', content.title);
      data.append('categoryId', content.categoryId);
      data.append('author', content.author);
      data.append('description', content.description);
      data.append('level', content.level);
      data.append('objective', content.objective);
      data.append('language', content.language);

      axios.post(config.api+"/course/", data, {
        headers: { Authorization: "Bearer " + admin.token },
        onUploadProgress: ProgressEvent => {
          dispatch({type:'ADD_COURSES_LOAD', payload: ProgressEvent.loaded / ProgressEvent.total*100});
        },
      }).then(res => {
        dispatch({type: "ADD_COURSES_SUCCEED", payload: res.data})
      })
      .catch((err) => {
          dispatch({type: "ADD_COURSES_FAILED", payload: err.response.data})
      })

  }
}

export function uploadVideo(file, content){
    return function(dispatch){
        const data = new FormData();
        data.append('file', file, file.name);
        data.append("id", content._id);
        data.append("categoryId", content.categoryId);
        
        dispatch({type: "BEGIN_UPLOAD_NEW_VIDEO",payload: { beginUpload: true }})

        axios
          .post(config.api+"/c/uploadvideo", data, {
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

export function uploadVideoPoster(file, content){
    return function(dispatch){
        const data = new FormData();

        data.append('file', file, file.name);
        data.append('id', content._id);
        data.append('categoryId', content.categoryId);

        dispatch({type: "BEGIN_UPLOAD_NEW_VIDEO_POSTER", payload: { beginUpload: true }})

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

export function uploadDisplayImage(file, content){
    return function(dispatch){
        const data = new FormData();
        data.append('file', file, file.name);
        data.append('id', content._id);
        data.append('categoryId', content.categoryId);

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
