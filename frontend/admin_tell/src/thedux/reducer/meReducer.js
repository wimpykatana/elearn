export default function reducer(state={
    data: null,
    login: false,
    fetching: false,
    fetched: false,
    error: null,
    token: null,
    child: null
}, action) {
    switch(action.type) {
        case "FETCH_USER_ME":{
            return { ...state, fetching:true, login:false }
        }

        case "FETCH_USER_ME_FULFILLED":{
            return {
                ...state,
                fetching: false,
                fetched: true,
                login:true,
                data: action.payload
            }
        }

        case "FETCH_USER_ME_FAILED":{
            return{
                ...state,
                fetching: false,
                fetched: true,
                login:false,
                child: action.payload
            }
        }
    
        case "GET_ME" : {
            return {...state, ...action.payload}
        }
    }
    
    return state;
};