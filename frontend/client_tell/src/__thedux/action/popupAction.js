export function popupRatingsClick(e) {
  return function(dispatch) {
    dispatch({type: "POPUP_RATINGS_START"});

    dispatch({type: "POPUP_RATINGS_SUCCEED", payload: e});
  }
}

export function noPopUp() {
  return function (dispatch) {
    dispatch({type: "POPUP_RATINGS_DISABLE"});
  }
}
