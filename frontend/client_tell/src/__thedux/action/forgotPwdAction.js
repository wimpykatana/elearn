
import config from '../../config/config.json';
import axios from 'axios';
import ReactGA from 'react-ga';

ReactGA.initialize(config.trackerId);

export function verifyEmail(id) {
    return function(dispatch){
        dispatch({type: 'VERIFY_EMAIL_START'});

        axios.get(config.api+"/user/verifyemail/"+id)
        .then(json => {
            dispatch({type: "VERIFY_EMAIL_SUCCEED", payload: json})
        })
        .catch((err) => {
            dispatch({type: "VERIFY_EMAIL_FAILED", payload: err.response.data})
        })
    }
}

export function checkTokenForgotPwd(token) {
    return function(dispatch){
        dispatch({type: 'CHECK_TOKEN_PWD_START'});

        axios.get(config.api+"/users/resetpassword/"+token)
        .then(json => {
            dispatch({type: "TOKEN_PWD_VALID", payload: json})
        })
        .catch((err) => {
            dispatch({type: "TOKEN_PWD_INVALID", payload: err.response.data})
        })
    }
}

export function resetPwd(token, data, token2) {
    return function(dispatch){
        dispatch({type: 'START_RESET_PWD'});

        if(token !== '') {
            data.token = token2
        }
       
        axios.post(config.api+"/users/resetpassword/"+token, data)
        .then(res => {
            if(res) {
                return dispatch({type: "PWD_UPDATED", payload: res.data});
            }
        })
        .catch((err) => {
            if(err.response) {
                dispatch({type: "RESET_PWD_REJECT", payload: err.response.data.details[0]});
            }
        })
    }
}

export function resetPassword(email, token){
    return function(dispatch){
        dispatch({type: "START_SEND_RESET_PASSWORD"});

        let data;

        if(token !== '') {
            data = {
                email: email,
                token:token
            }
        }
        else {
            data = {
                email: email
            }
        }

        axios.post(config.api+"/users/resetpassword", data)
        .then((res) => {
            if(res && res.data) {
                ReactGA.event({
                    category: "Forgot Password",
                    action: "Status update",
                    label: "Success Forgot Password"
                });

                return dispatch({type: "SEND_RESET_PASSWORD_SUCCES", payload: res.data});
            }

            dispatch({type: "SEND_RESET_PASSWORD_REJECT", payload: res.data})
            
        })
        .catch((error) => {
            // ReactGA.event({
            //     category: "Forgot Password",
            //     action: "Status update",
            //     label: "Failed Reset - not valid email"
            // });

            dispatch({type: "SEND_RESET_PASSWORD_REJECT", payload: error.response.data})
        })
    }
}