import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';
import Logo from '../../image/logo-Tell.svg';
import {delStorage, getFromStorage, setInStorage} from "../../utilis/storage";
import {connect} from "react-redux";
import "./logo.css";
import Ratings from "../ratings";
import {popupRatingsClick} from "../../__thedux/action/popupAction";

let ratenowcuy;
let jgnLupaRate;

class LogoHolder extends Component{

  constructor(props){
    super(props);
    this.state = {
      ngerate: null
    }
    this.logoClick = this.logoClick.bind(this);
    this.closeRate = this.closeRate.bind(this);
  }

  componentWillMount() {

    delStorage("RATINGS_READY");
    delStorage("USER_WATCH_VIDEO_RATINGS_CLICK_BREADCRUMB");
    this.setState({
      ngerate: false
    });
  }

  componentDidMount() {
    delStorage("RATINGS_READY");
    delStorage("USER_WATCH_VIDEO_RATINGS_CLICK_BREADCRUMB");
  }

  logoClick(e){

      jgnLupaRate = getFromStorage("RATINGS_READY");
      // return

      if(jgnLupaRate){
        this.props.dispatch(popupRatingsClick(e.currentTarget.dataset.url));
        setInStorage("USER_WATCH_VIDEO_RATINGS_CLICK_BREADCRUMB", true);

        this.setState({
          ngerate: true
        });
      }

      else{
        // console.log("aa");
        window.location.replace("/");
      }
    // }



  }

  closeRate(){
    console.log("aaa");

    ratenowcuy = null;
    delStorage("RATINGS_READY");
    delStorage("USER_WATCH_VIDEO_RATINGS_CLICK_BREADCRUMB");
    this.setState({
      ngerate: false
    });

    window.location.replace("/");
  }

  render() {
    if(!this.props.popup.disablePOP) {
      if (this.props.me) {
        return (
          <>
            <div onClick={this.logoClick} data-url={"/"} className="logo pull-left hidden-xs hidden-sm logo-ratings">
              <img src={Logo} alt="logo" style={{paddingTop: "5px", width: "85px"}}/>
            </div>

            <div onClick={this.logoClick} data-url={"/"}
                 className="logo hidden visible-xs visible-sm absolute text-center logo-ratings">
              <img className="center-block img-logo" alt="logo" src="/static/media/logo-TeLL.abc58e41.png"/>
            </div>

          </>
        )
      }
    }
    return(
      <>
        <Link to="/" className="logo pull-left hidden-xs hidden-sm" target="_self">
          <img src={Logo} alt="logo" style={{paddingTop: "5px", width: "85px"}} />
        </Link>

        <Link className="logo hidden visible-xs visible-sm absolute text-center" to="/" target="_self">
            <img className="center-block img-logo" alt="logo" src="/static/media/logo-TeLL.abc58e41.png" />
        </Link>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  courses: state.courses,
  popup: state.popup
});
const mapDispatchToProps = {
  popupRatingsClick,
};

export default connect(mapStateToProps,mapDispatchToProps)(LogoHolder);

