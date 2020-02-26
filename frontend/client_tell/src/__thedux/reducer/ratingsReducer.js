/* eslint-disable default-case */
export default function reducer(state={
  rate: null
}, action) {
  switch (action.type) {
    case "RATINGS_START":{
      return {
        ...state,
      }
    }
    case "RATINGS_SUCCEED":{
      return {
        ...state,
        rate: action.payload
      }
    }

  }

  return state;
}
