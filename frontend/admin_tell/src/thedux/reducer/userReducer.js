export default function reducer(state={
    data: null,
    fetching: false,
    fetched: false,
    start: false,
    error: null,
    token: null,
}, action) {
    switch(action.type){
        case "START_LOGIN" : {
            return {...state, start: true}
        }
        case "LOGIN_SUCCES":{
            return {...state, ...action.payload, start: false, error: false}
        }
        case "LOGIN_REJECT":{
            return {...state, start: false, ...action.payload, error: true}
        }
        case "START_LOGOUT" : {
            return {...state, fetching: true}
        }
        case "LOGOUT_SUCCES":{
            return {...state, fetching: false, fetched: true, data: action.payload, error: false}
        }
        case "LOGOUT_REJECT":{
            return {...state, fetching: false, fetched: true, data: action.payload, error: true}
        }
    }
    
    return state;
};