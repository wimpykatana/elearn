export function userRateValue(val) {
  return function(dispatch) {
    dispatch({type: "RATINGS_START"});

    dispatch({type: "RATINGS_SUCCEED", payload: val});

  }
}
