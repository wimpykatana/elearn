/* eslint-disable default-case */
export default function reducer(state={
  show: false,
  disablePOP: false,
  data: null
}, action) {
  switch (action.type) {
    case "POPUP_RATINGS_START":{
      return {
        ...state,
        start:true,

      }
    }
    case "POPUP_RATINGS_SUCCEED":{
      return {
        ...state,
        show: true,
        data: action.payload
      }
    }
    case "POPUP_RATINGS_FAILED": {
      return {
        ...state,
        show: false,

      }
    }
    case "POPUP_RATINGS_DISABLE": {
      return {
        ...state,
        disablePOP: true,

      }
    }
  }

  return state;
}
