import PropTypes from 'prop-types';
import React, { Component } from 'react';
import starIcon from "./star.png";
import classNames from 'classnames'
import Ratings from  '../../component/ratings';
import { checkrated, addRateVideo } from '../../__thedux/action/coursesAction';
import { connect } from "react-redux";
import axios from "axios";
import config from "../../config/config";
import {setInStorage} from "../../utilis/storage";


const propTypes = {
  player: PropTypes.object,
  className: PropTypes.string
};

class RatingNotif extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRate: false,
      timerOn: false,

    };
    this.startTimer = this.startTimer.bind(this);
    this.starClick = this.starClick.bind(this);
  }

  componentWillMount() {
    // console.log("hello from will mount");

  }

  starClick(){
    this.setState({
      isRate: true,
    })
    this.props.openRate();
  }

  startTimer(){

    this.setState({
      timerOn: true,
    });

  }


  render() {
    const { player } = this.props;
    const { currentTime } = player;
    const { hasStarted } = player;

    if(!this.state.isRate && this.props.me) {

      if (currentTime > 5 && hasStarted) {

        setTimeout(this.startTimer, 5000);

        return (

          <div
            onClick={this.starClick}
            className={this.state.timerOn ? "animated fadeInLeft video-ratings-holder" : "animated fadeInRight video-ratings-holder"}>
            <div onClick={this.starClick} className="video-ratings-icon">
              <span style={{cursor: "pointer"}}><img src={starIcon}/></span>
            </div>
            <div className={this.state.timerOn ? "video-ratings-text hidden" : "video-ratings-text"}>
              <span >Click here to rate</span>
            </div>
          </div>

        )
      }

    }

    return null

  }

}



export default RatingNotif;
