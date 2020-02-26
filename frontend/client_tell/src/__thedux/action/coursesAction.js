import config from '../../config/config.json';
import axios from 'axios';
import CryptoJS from 'crypto-js';

export function fetchAllCourses(){
    return function(dispatch) {
        dispatch({type: "FETCH_ALL_COURSES"});

        axios.get(config.api+"/course/")
            .then(json => {
                dispatch({type: "FETCH_ALL_COURSES_FULFILLED", payload: json.data.contents});
            })
            .catch((err) => {
                dispatch({type: "FETCH_ALL_COURSES_REJECTED", payload: err})
            })
    }
}

export function getDetailCourse(id){
    return function(dispatch){
        dispatch({type: "FETCH_DETAIL_COURSES"});

        axios(config.api+"/coursetitle/"+id)
        .then(json => {
            if(config.env === 'production') {//decrypt data for production only
                var bytes  = CryptoJS.AES.decrypt(json.data.content, config.keyEncrypt);
                json.data.content = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            }

            dispatch({type: "FETCH_DETAIL_COURSES_FULFILLED", payload: json.data});
        })
        .catch((err) => {
            dispatch({type: "FETCH_DATA_REJECTED", payload: err})
        })

    }
}

export function checkrated(idVideo,idUser){
    return function(dispatch){
        dispatch({type: "BEGIN_CHECK_USER_RATED"});
        axios.post(config.api+"/israted",{
            vidid: idVideo,
            userid: idUser
        })
        .then((res)=>{
            if(res){

                dispatch({type: "CHECK_USER_RATED", payload: res.data.value.rate[0]});
            }

            dispatch({type: "CHECK_USER_RATED_SUCCESS", payload: res.data.value.rate[0]});
        })
        .catch((err)=>{
            dispatch({type: "CHECK_USER_RATED_REJECT", payload: err});
        })
    }
}

export function addRateVideo(idVideo,rateValue,idUser, token){
    return function(dispatch){
        let data;

        data = {
            videoid: idVideo,
            rate: rateValue,
            userid: idUser
        }

        dispatch({type: "USER_BEGIN_RATE_VIDEO"});

        axios.post(config.api+"/ratevideo", data, {
            headers: {
                Authorization: 'Bearer '+token
            }
        })
        .then((res)=>{
            if(res){
                dispatch({type: "RATE_VIDEO", payload: res.data});
            }
            dispatch({type: "RATE_VIDEO_SUCCESS", payload: res.data});
        })
        .catch((err) => {
            dispatch({type: "RATE_VIDEO_REJECT", payload: err.response.data});
        })
    }
}

export function fetchCoursesBypage(page, categoryId, contentId){
    return function(dispatch){
        dispatch({type: "FETCH_COURSES_BY_PAGE"});

        axios.get(config.api+"/coursebycategorydetail/"+contentId+"/"+categoryId+"?page="+page)
            .then(json =>{
                dispatch({type: "FETCH_COURSES_BY_PAGE_FULFILLED", payload: json.data})
            })
            .catch((err) => {
                dispatch({type: "FETCH_DATA_REJECTED", payload: err})
            })
    }
}

export function fetchCoursesByCategory(categoryId, page, contentId){
    return async function(dispatch){
        dispatch({type: "FETCH_COURSES_BY_CATEGORY"});

        axios.get(config.api+"/coursebycategory/"+categoryId+"?page="+page+"&data="+contentId)
        .then(json =>{
            dispatch({type: "FETCH_COURSES_BY_CATEGORY_FULFILLED", payload: json.data})
        })
        .catch((err) => {
            dispatch({type: "FETCH_COURSES_BY_CATEGORY_REJECTED", payload: err})
        })
    }
}
