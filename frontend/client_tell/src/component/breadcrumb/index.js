import React, { Component } from 'react';
import icnHome from "../../image/home-black.svg";
import  {getFromStorage, delStorage, setInStorage } from "../../utilis/storage";
import "./breadcrumb.css";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import {popupRatingsClick} from "../../__thedux/action/popupAction";

let ratenowcuy;
let jgnLupaRate;

class BreadCrumb extends Component{

  constructor(props){
    super(props);
    this.state = {
      ngerate: false
    }

    this.breadCrumbHomeAndCatNameClick = this.breadCrumbHomeAndCatNameClick.bind(this);
    this.closeRate = this.closeRate.bind(this);
  }

  componentWillMount() {
    delStorage("RATINGS_READY");
    delStorage("USER_WATCH_VIDEO_RATINGS_CLICK_BREADCRUMB");
  }

  breadCrumbHomeAndCatNameClick(e){


    jgnLupaRate = getFromStorage("RATINGS_READY");

    if(jgnLupaRate){
      this.props.dispatch(popupRatingsClick(e.currentTarget.dataset.url));
      setInStorage("USER_WATCH_VIDEO_RATINGS_CLICK_BREADCRUMB", true);

      this.setState({
        ngerate: true
      });
    }
    else{
      window.location.replace(e.currentTarget.dataset.url);
    }

  }


  closeRate(e){

    console.log(e.currentTarget.dataset.url);

    ratenowcuy = null;
    delStorage("RATINGS_READY");
    delStorage("USER_WATCH_VIDEO_RATINGS_CLICK_BREADCRUMB");
    jgnLupaRate = getFromStorage("RATINGS_READY");

    this.setState({
      ngerate: false
    })

    window.location.replace(e.currentTarget.dataset.url);
  }

  render() {

    if(!this.props.popup.disablePOP) {
     // if (this.props.me && this.props.popup.show) {
      if (this.props.me) {
        return (

          <div className="col-xs-12">

            <ul className="breadcrumb-tell">

              <li><span onClick={this.breadCrumbHomeAndCatNameClick} data-url={`/`}><img src={icnHome} alt="icon-home"
                                                                                         width="25" height="25"
                                                                                         style={{marginTop: "-8px"}}/></span>
              </li>

              <li><span onClick={this.breadCrumbHomeAndCatNameClick}
                        data-url={`/category/${this.props.catlink}`}>{this.props.catname}</span></li>

              <li className="active1">{this.props.cattitle}</li>

            </ul>

          </div>

        )
      }
    }

    return (

      <div className="col-xs-12">

        <ul className="breadcrumb-tell">

          <li><Link to={`/`}><img src={icnHome} alt="icon-home" width="25" height="25" style={{marginTop: "-8px"}} target="_self"/></Link></li>

          <li><Link to={`/category/${this.props.catlink}`} target="_self" >{this.props.catname}</Link></li>

          <li className="active1">{this.props.cattitle}</li>

        </ul>

      </div>

    )

  }

}

const mapStateToProps = state => ({
  user: state.user,
  courses: state.courses,
  popup: state.popup
});

export default connect(mapStateToProps)(BreadCrumb);
