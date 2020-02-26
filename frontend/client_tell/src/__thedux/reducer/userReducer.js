

/* eslint-disable default-case */
export default function reducer(state={
    data: null,
    userDetail: null,
    signupData: null,
    fullname: null,
    userId: null,
    loginTime: null,
    logoutTime: null,
    message: null,
    fetching: false,
    fetched: false,
    error: null,
    signup:false,
    sendEmail: false
}, action) {
    switch (action.type) {
        case "CLEAR_USER": {
            return {...state, data: null, islogin: false}
        }

        case "FETCH_USER":{
            return {...state, fetching: true, fetched: false,}
        }
        
        
        case "FETCH_USER_FULFILLED":{
            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.payload,
                fullname: action.payload.fullname,
                userId: action.payload._id,
                loginTime: action.payload.loginTime,
                logoutTime: action.payload.logoutTime,
                message: action.payload.message,
                islogin: true
            }
             
        }

        case "BEGIN_UPDATE_PROFILE":{
            return{
                ...state,
                fetching: true,
                fetched: false,
            }
        }

        case "UPDATE_PROFILE_SUCCESS":{
            return{
                ...state,
                fetching: false,
                fetched:true,
                message: action.payload.message
            }
        }

        case "UPDATE_PROFILE_REJECT":{
            return{
                ...state,
                fetching: false,
                fetched: true,
                message: action.payload.message
            }
        }

        case "BEGIN_UPDATE_PASSWORD":{
            return{
                ...state,
                fetching: true,
                fetched: false,

            }
        }

        case "UPDATE_PASSWORD":{
            return{
                ...state,
                fetching: false,
                fetched: true,
                message: action.payload.message
            }
        }

        

        case "UPDATE_PASSWORD_SUCCESS":{
            return{
                ...state,
                fetching: false,
                fetched: true,
                message: action.payload.message
            }
        }

        case "UPDATE_PASSWORD_REJECT":{
            return{
                ...state,
                fetching: false,
                fetched: true,
                message: action.payload.message
            }
        }
    

        case "START_LOGIN":{
            return {...state, fetching: true, fetched: false}
        }
        case "LOGIN_SUCCES":{
            return {...state, fetching: false, fetched: true, data: action.payload, error: false, islogin: true}
        }
        case "LOGIN_REJECT":{
            return {...state, fetching: false, fetched: true, data: action.payload, error: true, islogin: false}
        }

        case "START_SIGNUP":{
            return {...state, fetching: true, signup: false}
        }
        case "SIGNUP_SUCCES":{
            return {...state, fetching: false, signup: true, signupData: action.payload}
        }
        case "SIGNUP_REJECT":{
            return {...state, fetching: false, signup: false, signupData: action.payload}
        }

        case "GET_LOGIN_STATUS":{
            return {...state, fetching: true, fetched: false, error: false}
        }
        case "USER_IS_LOGIN":{
            return {
                ...state, 
                fetching: false, 
                fetched: true,
                isLogin: true,
                userDetail: action.payload, 
                error: false
            }
        }
        case "USER_NOT_LOGIN_YET":{
            return{
                ...state,
                fetching: false, 
                userDetail: null,
                error: true
            }
        }

        case "START_LOGOUT":{
            return {...state, error: false, islogin: true}
        }
        case "USER_LOGOUT":{
            return {
                ...state, 
                islogin: false, 
                error: false
            }
        }
        case "LOGOUT_FAILED":{
            return{
                ...state,
                islogin: false,
                error: true
            }
        }
        case "BEGIN_GOOGLE_LOGIN":{
            return{
                ...state,
                error: false
            }
        }
        case "LOGIN_GOOGLE":{
            return{
                ...state,
                isLogin: true,
                error: false,
                message: action.payload
            }
        }
        case "LOGIN_GOOGLE_SUCCESS":{
            return{
                ...state,
                isLogin: true,
                error: false,
                message: action.payload
            }
        }
        case "LOGIN_GOOGLE_REJECT":{
            return{
                ...state,
                isLogin: false,
                message: action.payload
            }
        }
        
    }

    return state
}