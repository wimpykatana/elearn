import React, { Component } from 'react';
import { Player, ControlBar, LoadingSpinner, BigPlayButton, ReplayControl, ForwardControl, PlaybackRateMenuButton, Shortcut} from 'video-react';
import './video-react.css';
import HLSSource from './HLSSource';
// import RatingButton from "./buttonRating";
import RatingNotif from "./notifRating";
import config from '../../config/config';
import { connect } from "react-redux";
import Ratings from '../ratings';
// import RatingsSecond from '../ratingsSecond';
import axios from 'axios';

import ReactGA from 'react-ga';
import {delStorage, getFromStorage, setInStorage} from "../../utilis/storage";
import {noPopUp} from "../../__thedux/action/popupAction";
ReactGA.initialize(config.trackerId);

let isPlay = false;
let rateHolder;
let setCount = false

class Playerwim extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      source: this.props.source,
      poster: this.props.poster,
      vidid: this.props.id,
      userid: null,
      rate: false,
      player: {}
    };

    this.closeRate = this.closeRate.bind(this);
    this.openRate = this.openRate.bind(this);
  }

  componentDidMount() {
    // subscribe state change
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  handleStateChange(state) {
    // copy player state to this component's state
    this.setState({
      player: state
    });
  }

  openRate(){
    if(this.state.player.isFullscreen){
      this.player.toggleFullscreen();
    }
    this.setState({
      rate: true,
    });
  }

  closeRate(){
    delStorage("RATINGS_READY");
    delStorage("USER_WATCH_VIDEO_RATINGS_CLICK_BREADCRUMB");
    this.props.dispatch(noPopUp());
    this.setState({
      rate: false,
    });

  }
 render() {

   if(this.state.player.ended){
     if(this.state.player.isFullscreen){
       this.player.toggleFullscreen();
     }
   }

   if(this.state.player.currentTime > 5 && this.state.player.hasStarted) {
     // console.log(this.state.player.currentTime);
     setInStorage("RATINGS_READY",true);
   }


    if(this.state.player.hasStarted && !isPlay) {
      isPlay = true;
      let userId = null;

      ReactGA.event({
        category: "Video",
        action: "Play",
        label: this.props.courses.data.content.title,
       // value: ''+this.state.player.duration
      });

      if(this.props.me) {
        ReactGA.event({
          category: "Video (User)",
          action: "Play",
          label: this.props.courses.data.content.title,
          //value: ''+this.props.user.userDetail.fullname
        });

        userId = this.props.me._id;
      } else {
        ReactGA.event({
          category: "Video (Anonymous)",
          action: "Play",
          label: this.props.courses.data.content.title,
         // value: 'Anonymous'
        });
      }

      //counting internal
      // axios.post(config.api+"/course/watched/"+this.props.courses.data.content._id, {
      //     userId: userId
      // });
    }

    document.getElementsByClassName(".video-react").oncontextmenu = function(e){
      e.preventDefault();
    }

    if(Math.floor(this.state.player.currentTime) >= 60 && !setCount){
      setCount = true;

      axios.post(config.api+"/course/watched/"+this.props.courses.data.content._id, {
        userId: (this.props.me) ? this.props.me._id : null
      });
    }

   if(this.props.me && this.state.rate){
     rateHolder =
       <div style={{
         position: "absolute",
         zIndex: 9,
         background: "rgba(255,255,255, 0.9)",
         height: "100%",
         width: "100%",
       }}>
         <div className="close-popup" onClick={this.closeRate}>[X]</div>
         <Ratings {...this.props} />
       </div>

   }
   else{
     rateHolder = ""
   }

    const arrSource = this.state.source.split("/");
    const arrType = arrSource[arrSource.length - 1].split(".");

    if(arrType[arrType.length - 1] === 'm3u8' || arrType[arrType.length - 1] === 'M3U8') { //player for hls
      return (
        <div className="player-holder">

          {rateHolder}


          <Player playsInline={true} poster={this.state.poster} ref={ player => { this.player = player; }}>
            <LoadingSpinner />
            <HLSSource isVideoChild src={this.state.source}/>
            {/* <source src={this.state.source} /> */}
            <Shortcut clickable={true} shortcuts={this.newShortcuts} />

            <RatingNotif {...this.props} openRate={this.openRate} />

            <ControlBar autoHide={true} >
              <ReplayControl seconds={10} order={1.1} />
              <ForwardControl seconds={10} order={1.2} />
              <PlaybackRateMenuButton
                rates={[1.5, 1.25, 1, 0.75 ]}
                order={7.1}
              />
            </ControlBar>
            <BigPlayButton position="center"/>

          </Player>
        </div>
      );
    }

    return ( //player non hls
      <div className="player-holder">
        <Player playsInline={true} poster={this.state.poster} ref="player">
          <LoadingSpinner />
          <source src={this.state.source} />
          <Shortcut clickable={true} shortcuts={this.newShortcuts} />


          <ControlBar autoHide={true} >
            <ReplayControl seconds={10} order={1.1} />
            <ForwardControl seconds={10} order={1.2} />
            <PlaybackRateMenuButton
              rates={[1.5, 1.25, 1, 0.75 ]}
              order={7.1}
            />
          </ControlBar>
          <BigPlayButton position="center"/>
        </Player>
      </div>
    );

  }
}

const mapStateToProps = state => ({
  user: state.user,
  courses: state.courses

});

const mapDispatchToProps = {
  noPopUp,
};

export default connect(mapStateToProps,mapDispatchToProps)(Playerwim)
