
import config from '../../config/config.json';
import axios from 'axios';

let run = false;

export function contact(contact, token) {
    if(run) {
        return function() {
            console.log("Loading....")
        }
    }

    return function(dispatch) {
        run = true;
        return new Promise((resolve, reject) => {
            dispatch({type: 'CONTACT_SUBMIT_START'});

            let data;

            if(token !== '') {
                data = {
                    token: token,
                    who: contact.type2,
                    company: (contact.type === '1') ? contact.emiten : '',
                    fullname: contact.fullname,
                    hp: contact.hp,
                    email: contact.email,
                    ph: ((contact.type === '1')) ? contact.drline : '',
                    message: (contact.type === '2' || contact.sMessage === '3') ? contact.message : contact.sMessage2
                }
            } else {
                data = {
                    who: contact.type2,
                    company: (contact.type === '1') ? contact.emiten : '',
                    fullname: contact.fullname,
                    hp: contact.hp,
                    email: contact.email,
                    ph: ((contact.type === '1')) ? contact.drline : '',
                    message: (contact.type === '2' || contact.sMessage === '3') ? contact.message : contact.sMessage2
                }
            }

            axios.post(config.api+"/contactus", data)
            .then(json => {
                run = false;
                dispatch({type: "CONTACT_SUBMIT_SUCCEED", payload: json.data});
                resolve(json.data)
            })
            .catch((err) => {
                run = false;
                dispatch({type: "CONTACT_SUBMIT_FAILED", payload: {error:true}});
                reject([]);
            })
        });
    }
}