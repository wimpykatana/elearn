import React, { Component } from 'react';
import { checkrated, addRateVideo } from '../../__thedux/action/coursesAction';
import { connect } from "react-redux";
import './ratings.css';
import {userRateValue} from "../../__thedux/action/ratingsAction"

let ratevalue;

class Ratings extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            userid : this.props.me._id,
            videoid: this.props.courses._id,
            rateUserValue: null
        };

        this.ratingclick = this.ratingclick.bind(this);
        this.userRate = this.userRate.bind(this);
    }

    componentWillMount(){


      console.log("will mount");

        console.log(this.props.courses.title);

        console.log("course id",this.props.courses._id);
        console.log("user id",this.props.me._id);


        if(this.state.userid && this.state.videoid ){

           this.props.dispatch(checkrated(this.state.videoid,this.state.userid));

        }

    }

    componentWillReceiveProps(){

    }

    userRate(e){

        this.setState({
          ...this.state,
          rateUserValue: e.target.value
        })
        console.log("e.target", e.target.value);
        this.props.dispatch(userRateValue(e.target.value));

        // this.forceUpdate(); // Without this line the elements do not re-render
    }

    // shouldComponentUpdate(){
    //     console.log("caalledd");
    // }

    async ratingclick(){

      // let ratesend = this.state.rateUserValue ? this.state.rateUserValue : this.props.ratings.ratings;
      let ratesend = this.props.rateValRedux;


      if(this.props.me) {
          this.props.dispatch(addRateVideo(this.state.videoid, ratesend, this.state.userid, this.props.me.token));

      }

    }

    render(){

      if(this.props.rateValRedux){
        console.log("dari component",this.props.rateValRedux);
        ratevalue = this.props.rateValRedux*20;
      }

      if(this.state.rateUserValue){
        ratevalue = this.state.rateUserValue*20;

        console.log("if 1", ratevalue)
      }

      if (this.state.rateUserValue == null && this.props.ratings){
        ratevalue = this.props.ratings.ratings*20;
        console.log("if 2", ratevalue)
      }


        if(this.props.rateMessage === "success"){
            return(
                <div className="ratings-holder-ask">
                {/*<div style={{minHeight:"250px", display:"block", color:"#000", paddingTop: "95px"}}>*/}

                  <h3 className="text-center">Thank you for watching</h3>

                </div>
            )
        }

        return(

            <div className="ratings-holder-ask">
            {/*<div style={{minHeight:"250px", display:"block", color:"#000", paddingTop: "35px"}}>*/}
                <h3 className="text-center">How inspired are you ?</h3>

                <div className="text-center" style={{margin: '20px 0'}}>
                  <div className="stars-holder">
                    <div className="stars">

                      <input onChange={this.userRate} type="radio" name="star" className="star-1" id="star-1" value="1" /><label className="star-1" htmlFor="star-1">1</label>
                      <input onChange={this.userRate} type="radio" name="star" className="star-2" id="star-2" value="2" /><label className="star-2" htmlFor="star-2">2</label>
                      <input onChange={this.userRate} type="radio" name="star" className="star-3" id="star-3" value="3" /><label className="star-3" htmlFor="star-3">3</label>
                      <input onChange={this.userRate} type="radio" name="star" className="star-4" id="star-4" value="4" /><label className="star-4" htmlFor="star-4">4</label>
                      <input onChange={this.userRate} type="radio" name="star" className="star-5" id="star-5" value="5" /><label className="star-5" htmlFor="star-5">5</label>
                      {
                        this.props.rateValRedux ?
                          <span style={{ width: this.props.rateValRedux*20+"%" }}></span>
                        :
                          <span style={{ width: ratevalue+"%" }}></span>
                      }



                    </div>
                    <br />
                    <div className="btn btn-blue" onClick={this.ratingclick}>Submit</div>
                  </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    courses: state.courses.data.content,
    ratings: state.courses.israted,
    rateMessage: state.courses.rateMessage,
    rateValRedux: state.ratings.rate
})

export default connect(mapStateToProps)(Ratings);
