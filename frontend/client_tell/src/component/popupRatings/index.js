import React, { Component } from 'react';
import { connect } from "react-redux";
import {delStorage} from "../../utilis/storage";
import Ratings from "../ratings";
// import RattingsPopup from "../ratingsPopup";

class PopupRatings extends Component{
  constructor(props){
    super(props);
    this.closeRate = this.closeRate.bind(this);
  }

  closeRate(){

    delStorage("RATINGS_READY");
    delStorage("USER_WATCH_VIDEO_RATINGS_CLICK_BREADCRUMB");

    // console.log()
    window.location.replace(this.props.popup.data);
  }

  render() {
    return(
      <div className="ratings-popup-holder">
        <div className="popup-ratings">
          <div className="close-popup" onClick={this.closeRate}>[X]</div>

          <Ratings {...this.props} />

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  popup: state.popup
});

export default connect(mapStateToProps)(PopupRatings);
