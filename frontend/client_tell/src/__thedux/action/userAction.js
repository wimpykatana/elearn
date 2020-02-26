
import config from '../../config/config.json';
import axios from 'axios';
import {auth} from '../../utilis/auth.js';
import ReactGA from 'react-ga';

ReactGA.initialize(config.trackerId);

export function contactUs() {
    return function(dispatch){
        dispatch({type: "GET_LOGIN_STATUS"});

        axios.post(config.api+"/user/contactus")
        .then(json => {
            if(json && json.data) {
                //set userId ga
                window.ga('set', 'userId', json.data.data._id);
                
                return dispatch({ type: "USER_IS_LOGIN", payload: json.data.data});
            }

            dispatch({type: "USER_NOT_LOGIN_YET", payload: json.response});
        })
        .catch((err) => {
            dispatch({type: "USER_NOT_LOGIN_YET", payload: err.response});
        })
    }
}

export function getUser(id) {
    return function(dispatch){
        dispatch({type: 'FETCH_USER'})
        // fetch(config.api+"/users/"+id)
        // .then(res => res.json())
        // .then(json => {
        //     console.log(json.user);
        //     dispatch({type: "FETCH_SINGLE_USER_FULFILLED", payload: json.user})
        // })
        // .catch((err) => {
        //     dispatch({type: "FETCH_SINGLE_USER_REJECTED", payload: err})
        // })
    }
}

export function verivyUser(){
    return function(dispatch){
        dispatch({type: "GET_LOGIN_STATUS"});

        axios.get(config.api+"/user/me")
        .then(json => {

          // console.log("very usser",json.data);

            if(json && json.data) {
                //set userId ga
                window.ga('set', 'userId', json.data.data._id);

                return dispatch({ type: "USER_IS_LOGIN", payload: json.data.data});
            }

            dispatch({type: "USER_NOT_LOGIN_YET", payload: json.response});
        })
        .catch((err) => {
            dispatch({type: "USER_NOT_LOGIN_YET", payload: err.response});
        })
    }
}

//UPDATE PROFILE
export function updateUserProfile(data,token){
    return function(dispatch){
        dispatch({type: "BEGIN_UPDATE_PROFILE"});

        axios.post(config.api+"/user/update",{
            id: data._id,
            fullname: data.fullname,
            headline: data.headline,
            dob: data.dob,
            linkPersonalWeb: data.linkPersonalWeb,
            facebookLink: data.facebookLink,
            youtubeLink: data.youtubeLink,
            linkedinLink: data.linkedinLink
        })
        .then((res)=>{
            if(res && res.data){
                dispatch({type: "UPDATE_PROFILE_SUCCESS", payload: res.data});
            }
        })
        .catch((err)=>{
            dispatch({type: "UPDATE_PROFILE_REJECT", payload: err.response.data})
        })
    }
}

//UPDATE PASSWORD
export function updateUserPassword(data,user){
    return function(dispatch){
        dispatch({type: "BEGIN_UPDATE_PASSWORD"});

        axios.post(config.api+"/user/chnp",{
            id: user,
            password: data.password,
            newPassword: data.newPassword,
            reNewPassword: data.rePassword
        })
        .then((res)=>{
            if(res){
                dispatch({type: "UPDATE_PASSWORD", payload: res.data});
            }

            dispatch({type: "UPDATE_PASSWORD_SUCCESS", payload: res.data});
        })
        .catch((err) => {
            dispatch({type: "UPDATE_PASSWORD_REJECT", payload: err.response.data})
        })
    }
}

//google login
export function glogin(email,name,token,provider,provider_id,user_pic){
    return function(dispatch){
        dispatch({type: "BEGIN_GOOGLE_LOGIN"});
        axios.post(config.api+"/user/socialnetwork/login",{
            email: email,
            name: name,
            token: token,
            provider: provider,
            provider_id: provider_id,
            user_pic: user_pic
        })
        .then((res)=>{
            if(res){
                if(email !== ''){
                    localStorage.setItem("username", email);
                }

                if(email !== ''){
                    localStorage.removeItem("username");
                }

                //need set
                // *******------  window.ga('set', 'userId', user_id_property);   ------****


                dispatch({type: "LOGIN_GOOGLE", payload: res.data});
            }

            dispatch({type: "LOGIN_GOOGLE_SUCCESS", payload: res.data});
        })
        .catch((err) => {
            dispatch({type: "LOGIN_GOOGLE_REJECT", payload: err.response.data});
        })
    }
}

export function onlogin(id, pass, remember, token){
    return async function(dispatch) {
        try {
            dispatch({type: "START_LOGIN"});

            let data;

            if(token !== '') {
                data = {
                    email: id,
                    password:pass,
                    token:token
                }
            }
            else {
                data = {
                    email: id,
                    password:pass
                }
            }

            const res = await axios.post(config.api+"/users/acc/login", data);

            ReactGA.event({
                category: "Login",
                action: "Status Update",
                label: "Success Login"
            });

            //set user id
            window.ga('set', 'userId', res.data.id);

            dispatch({type: "LOGIN_SUCCES", payload: res.data});
        } catch(error) {
            // if(error.response.data.message === 'Please insert your valid email') {
            //     ReactGA.event({
            //         category: "Login",
            //         action: "Status Update",
            //         label: "Failed Login - Invalid Email"
            //     });
            // }

            // if(error.response.data.message === 'password Minimum Length 5') {
            //     ReactGA.event({
            //         category: "Login",
            //         action: "Status Update",
            //         label: "Failed Login - Minimum Length"
            //     });
            // }

            // if(error.response.data.message === 'Your email or password is in incorrect, please recheck.') {
            //     ReactGA.event({
            //         category: "Login",
            //         action: "Status Update",
            //         label: "Failed Login - Wrong User name or password"
            //     });
            // }

            ReactGA.event({
                category: "Login",
                action: "Status Update",
                label: "Failed Login - Wrong User name or password"
            });
            //error.response.data.message = 'Invalid Email or Password';

            dispatch({type: "LOGIN_REJECT", payload: error.response.data});
        }
    }
}

export function signup(data, token2){
    return async function(dispatch) {
        try {
            dispatch({type: "START_SIGNUP"});

            const token = await auth();
            let data2;

            if(token2 !== '') {
                data2 = {
                    fullname: data.fullName,
                    email: data.email,
                    password: data.password,
                    newsletter: data.newsletter,
                    token:token2
                }
            }
            else {
                data2 = {
                    fullname: data.fullName,
                    email: data.email,
                    password: data.password,
                    newsletter: data.newsletter
                }
            }

            const res = await axios.post(config.api+"/users/acc/regis", data2, {
                headers: {
                    authorization: "Bearer "+token
                }
            });

            window.ga('set', 'userId', res.data.id);

            ReactGA.event({
                category: "Sign up",
                action: "Status update",
                label: 'Success Sign up'
            });

            dispatch({type: "SIGNUP_SUCCES", payload: res.data});
        } catch (err) {
            // if(err.response.data.message === 'fullname Minimum Length 3') {
            //     ReactGA.event({
            //         category: "Sign up",
            //         action: "Status update",
            //         label: 'Failed Signup - min name length'
            //     });
            // }

            // if(err.response.data.message === 'Please insert your valid email') {
            //     ReactGA.event({
            //         category: "Sign up",
            //         action: "Status update",
            //         label: 'Failed Sign up - invalid email'
            //     });
            // }

            // if(err.response.data.message === 'password Minimum Length 5') {
            //     ReactGA.event({
            //         category: "Sign up",
            //         action: "Status update",
            //         label: 'Failed Sign up - min length'
            //     });
            // }

            dispatch({type: "SIGNUP_REJECT", payload: err.response.data})
        }
    }
}

export function logout(){
    return function(dispatch) {
        dispatch({type: "START_LOGOUT"});

        axios.get(config.api+"/users/acc/logout")
        .then((json) => {
            if(json && json.data) {
                dispatch({type: "USER_LOGOUT", payload: json.data});
            }

        })
        .catch((error) => {
            dispatch({type: "LOGOUT_FAILED", payload: error.response})
        })
    }
}

