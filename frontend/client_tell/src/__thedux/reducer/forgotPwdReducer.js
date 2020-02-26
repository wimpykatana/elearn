/* eslint-disable default-case */
export default function reducer(state={
    data: null,
    status: null,
    error: false,
    loading:false
}, action) {
    switch (action.type) {
        case "CLEAR_VAR_RESET_PASS":{
            return {
                ...state, 
                data: null,
                status: null,
                error: false,
                info:null,
                loading:false
            }
        }

        case "VERIFY_EMAIL_START":{
            return {
                ...state, 
                info:'cek_email', 
                error: false, 
                loading:false
            }
        }
        case "VERIFY_EMAIL_SUCCEED":{
            return {
                ...state,
                data: action.payload.data,
                status:'cek_email',
                error: false,
                loading:false
            }
        }
        case "VERIFY_EMAIL_FAILED": {
            return {
                ...state,
                data: action.payload,
                status:'cek_email',
                error: true,
                loading:false
            }
        }

        case "CHECK_TOKEN_PWD_START":{
            return {
                ...state, 
                info:'cek_token', 
                error: false, 
                loading:false
            }
        }
        case "TOKEN_PWD_VALID":{
            return {
                ...state,
                data: action.payload,
                status:'cek_token',
                error: false,
                loading:false
            }
        }
        case "TOKEN_PWD_INVALID": {
            return {
                ...state,
                data: action.payload,
                status:'cek_token',
                error: true,
                loading:false
            }
        }
        
        case "START_RESET_PWD": {
            return {...state, error: false, status:'update_pwd', loading:false}
        }
        case "PWD_UPDATED": {
            return {
                ...state,
                data: action.payload,
                status:'update_pwd',
                error: false,
                loading:false
            }
        }
        case "RESET_PWD_REJECT": {
            return {
                ...state,
                data: action.payload,
            }

        }

        case "START_SEND_RESET_PASSWORD":{
            return {...state, data:null, sendEmail: false}
        }
        case "SEND_RESET_PASSWORD_SUCCES":{
            return {...state, sendEmail:true, data: action.payload}
        }
        case "SEND_RESET_PASSWORD_REJECT":{
            return {...state, sendEmail:false, data: action.payload}
        }
    }

    return state;
}

   