export default function reducer(state={
    data: null,
    fetching: false,
    fetched: false,
    error: null,
    token: null,
    isLogin:false,
}, action) {
    switch(action.type) {
        case "FETCH_USER_ME":{
            return { ...state, fetching: true }
        }
        case "FETCH_USER_ME_FULFILLED":{
            return{
                ...state,
                fetching: false,
                fetched: true,
                data: action.payload,
                isLogin:true,
            }
        }
        case "FETCH_USER_LOGIN_REJECT":{
            return{
                ...state,
                fetching: false,
                fetched: true,
                child: action.payload
            }
        }

        case "START_LOGIN" : {
            return {...state, fetching: true}
        }
        case "LOGIN_SUCCES":{
            return {...state, fetching: false, fetched: true, data: action.payload, isLogin: true, error: false}
        }
        case "LOGIN_REJECT":{
            return {...state, fetching: false, fetched: true, data: action.payload, error: true, isLogin: false}
        }

        case "LOGOUT_START" : {
            return {...state, fetching: true}
        }
        case "USER_LOGOUT_ALREADY":{
            return {...state, fetching: false, fetched: true, data: action.payload, isLogin: false, error: false}
        }
        case "LOGOUT_REJECT":{
            return {...state, fetching: false, fetched: true, data: action.payload, error: true, isLogin: true}
        }
    }
    
    return state;
};