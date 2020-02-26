/* eslint-disable default-case */
export default function reducer(state={
    start: false,
    data: null
}, action) {
    switch (action.type) {
        case "CONTACT_SUBMIT_START":{
            return {
                ...state,
                start:true,
                data: null
            }
        }
        case "CONTACT_SUBMIT_SUCCEED":{
            return {
                ...state,
                start: false,
                data: action.payload
            }
        }
        case "CONTACT_SUBMIT_FAILED": {
            return {
                ...state,
                start: false,
                data: action.payload,
            }
        }
    }

    return state;
}

   