import React, { Component } from "react";
import "./style.css";
import iconEdit from "./icn_edit.png";
import ReactTooltip from 'react-tooltip';
import { updateUserProfile } from "../../../../__thedux/action/userAction";
import { connect } from "react-redux";
import DatePicker from 'react-date-picker';
import SimpleReactValidator from "simple-react-validator";
import moment from "moment";

// import { stat } from "fs";

let info = null;

class ProfileHolder extends Component{
    constructor(props){
        super(props);

        this.state={
            date: new Date(),
            editContent: false,
            info: false,
            user: this.props.me
        }

        this.validator = new SimpleReactValidator({
            className: 'text-danger',
            messages: {
                alpha_space:"Name should be only contain letters",
                max: "Headline may not be greater than 100 characters"
            },
            
          });

        this.handleInput = this.handleInput.bind(this);
        this.editClick = this.editClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.submitUpdate = this.submitUpdate.bind(this);
        this.closeMe = this.closeMe.bind(this);
    }

    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        
        this.setState(
            prevState => ({
                ...prevState,
                [name]: value
            })
          );
  
        this.state.user[name] = value;

    }

    editClick(){
        this.setState({
            editContent: !this.state.editContent
        })
    }

    submitUpdate(){


        if (this.validator.allValid()) {
            this.props.dispatch(updateUserProfile(this.state.user));

            this.setState({
                editContent: !this.state.editContent,
                info: true
            })
          } else {
            this.validator.showMessages();
            this.forceUpdate();
          }
        
    }
    closeMe(){

        info = null;
        this.setState({
            info: false
        })
    }


    onChange(date){
        this.setState({
            date: moment(date)
        });

        this.state.user.dob = moment(date);
    }

    render(){
        

        info = <div className={this.state.info ? "text-center alert alert-success fade show" : "text-center alert alert-success fade hide"} role="alert"><p>Your profile has been update</p></div>;
        
        return(
            <div className="profile-holder">
                
                <div className="profile-header-profile">
                    My Profile
                    
                    <div className="pull-right" style={{margin: '3px 0 0 0'}}>
                        <p onClick={this.editClick} className="iconeditprofile" data-tip data-for='editprofile'><img src={iconEdit} className="pull-right" alt="icn-edit" /></p>
                        
                        <ReactTooltip place="right" type="dark" id='editprofile'>
                            <span>Click here to edit your profile</span>
                        </ReactTooltip>
                    </div>
                </div>

                {info}

                <div className="basicProfile">
                    <h4>Basic</h4>
                    <hr />
                    <br />

                    <div className="input-holder-prof">
                        <div className="col-xs-2">Full name</div>
                        <div className="col-xs-1">:</div>
                        <div className="col-xs-9">
                            <input 
                                type="text" 
                                className="form-control input-profile" 
                                placeholder="Please input" 
                                id="fullname" 
                                name="fullname" 
                                onChange={this.handleInput} 
                                value={this.state.user.fullname}
                                disabled={this.state.editContent ? false : true} />

                            {this.validator.message('fullname', this.state.user.fullname, 'required|alpha_space')}
                                
                        </div>
                    </div>
                    
                    <div className="input-holder-prof">
                        <div className="col-xs-2">Headline</div>
                        <div className="col-xs-1">:</div>
                        <div className="col-xs-9">

                            <textarea
                                // type="text"
                                className="form-control input-profile"
                                placeholder="Please input"
                                id="headline"
                                name="headline"
                                onChange={this.handleInput}
                                value={this.state.user.headline}
                                disabled={this.state.editContent ? false : true} />

                            {this.validator.message('headline', this.props.me.headline, 'max:100')}


                        </div>
                    </div>
                    
                    <div className="input-holder-prof">
                        <div className="col-xs-2">Date of birth</div>
                        <div className="col-xs-1">:</div>
                        <div className="col-xs-9">
                
                                <DatePicker
                                    onChange={this.onChange}
                                    onClick={this.onClickCal}
                                    format= {"dd-MM-y"}
                                    clearIcon= {null}
                                    // value={this.props.user.dob ? new Date(this.props.user.dob) : new Date(2017, 7, 1)}
                                    value={this.state.user.dob ? new Date(this.state.user.dob) : null}
                                    disabled={this.state.editContent ? false : true}
                                    // className={"mycalender"}
                                />

                                {/* {this.validator.message('before', this.state.before && moment(this.state.before, 'YYYY-MM-DD'), [{before: moment().add(1, 'month')}])} */}
                            
                        </div>
                    </div>
                    <div className="clearfix"></div>
                </div>

                <div className="otherLinks">
                    <h4>Links</h4>
                    <hr />
                    <br />
                    <div className="input-holder-prof">
                        <div className="col-xs-2">Website</div>
                        <div className="col-xs-1">:</div>
                        <div className="col-xs-9">
                            <input 
                                type="text" 
                                className="form-control input-profile" 
                                placeholder="Please input your personal website here" 
                                id="linkPersonalWeb" 
                                name="linkPersonalWeb" 
                                onChange={this.handleInput} 
                                value={this.state.user.linkPersonalWeb}
                                disabled={this.state.editContent ? false : true} />
                        </div>
                    </div>
                    
                    <div className="input-holder-prof">
                        <div className="col-xs-2">Facebook</div>
                        <div className="col-xs-1">:</div>
                        <div className="col-xs-9">
                            <input 
                                type="text" 
                                className="form-control input-profile" 
                                placeholder="Please input your facebook account here" 
                                id="facebookLink" 
                                name="facebookLink" 
                                onChange={this.handleInput} 
                                value={this.state.user.facebookLink}
                                disabled={this.state.editContent ? false : true} />
                        </div>
                    </div>
                    
                    <div className="input-holder-prof">
                        <div className="col-xs-2">Youtube</div>
                        <div className="col-xs-1">:</div>
                        <div className="col-xs-9">
                            <input 
                                type="text" 
                                className="form-control input-profile" 
                                placeholder="Please input your youtube account here" 
                                id="youtubeLink" 
                                name="youtubeLink" 
                                onChange={this.handleInput} 
                                value={this.state.user.youtubeLink}
                                disabled={this.state.editContent ? false : true} />
                        </div>
                    </div>
                    
                    <div className="input-holder-prof">
                        <div className="col-xs-2">LinkedIn</div>
                        <div className="col-xs-1">:</div>
                        <div className="col-xs-9">
                            <input 
                                type="text" 
                                className="form-control input-profile" 
                                placeholder="Please input your LinkedIn account here" 
                                id="linkedinLink" 
                                name="linkedinLink" 
                                onChange={this.handleInput} 
                                value={this.state.user.linkedinLink}
                                disabled={this.state.editContent ? false : true} />
                        </div>
                    </div>

                    <button className={this.state.editContent ? "btn-submit-update" : "hidden"} onClick={this.submitUpdate}>Update</button>

                </div>

                <div className="clearfix"></div>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    message: state.user.message,
    user: state.user.userDetail,
});
export default connect(mapStateToProps)(ProfileHolder);
