import React, { Component } from "react";
import "./style.css";
import { updateUserPassword } from "../../../../__thedux/action/userAction";
import { connect } from "react-redux";
import SimpleReactValidator from "simple-react-validator";


let response;

class AccountHolder extends Component {
    constructor(props){
        super(props); 

        this.state={
            editPaswShow: false,
            password: "",
            newPassword: "",
            rePassword: "",
            info: false,
        }

        this.validator = new SimpleReactValidator({
            className: 'text-danger',
            messages: {
                max: "new password may not be greater than 15 characters",
                min: "new password should be at least 6 characters",
                required: 'Please :attribute'
            },
            validators: {
                pasw:{
                    message: 'your password should contain 1 number and 1 letter',
                    rule: function(val, params, validator) { 

                        return validator.helpers.testRegex(val,/^(?=.*[a-z])(?=.*[0-9])/i) && params.indexOf(val) === -1

                    }
                }
            }
        });

        this.handleInput = this.handleInput.bind(this);
        this.editClick = this.editClick.bind(this);
        this.submitNewPass = this.submitNewPass.bind(this);

    }

    componentWillReceiveProps(){
        if( this.props.api.message === "Your password has been changed" ){
            this.setState({
                editPaswShow: false,
                password: "",
                newPassword: "",
                rePassword: "",
            })
        }
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
        
    }

    editClick(){
        this.setState({
            editPaswShow: !this.state.editPaswShow
        })

        response = "";
        this.props.api.message = "";
    }

    submitNewPass(){

        if (this.validator.allValid()) {

            this.props.dispatch(updateUserPassword(this.state,this.props.me._id));

            this.setState({
                info: true
            })

        } else {

            this.validator.showMessages();
            this.forceUpdate();

        }
    }

    render(){

        if( this.props.api.message){

            if( this.props.api.message === "Your password has been changed" ){
                response =  <div className={"text-center alert alert-success"} role="alert">
                                <p>{this.props.api.message}</p>
                            </div>;
                
            }else{
                response =  <div className={ "text-center alert alert-warning" } role="alert">
                                <p>{this.props.api.message}</p>
                            </div>;

            }
        }

        return(
            <div className="account-holder">
                
                <div className="account-header">
                    My Account
                </div>

                {response}

                <div className="basicEmail">
                    <h4>Email</h4>
                    <hr />

                    <div>
                        <div className="col-xs-2">Email</div>
                        <div className="col-xs-1">:</div>
                        <div className="col-xs-9">{this.props.me.email}</div>
                    </div>

                </div>
                
                <div className="clearfix"></div>
                <br />

                <div className={ this.state.editPaswShow ? "btn-change-pasw-holder hidden" : "btn-change-pasw-holder"}>
                    <button className="btn-change-pasw" onClick={this.editClick}>Change Password</button>
                </div>

                <div className={ this.state.editPaswShow ? "passwordHolder" : "passwordHolder hidden"}  >

                    <div>
                    <h4>Password</h4>
                    <hr />

                    <div className="input-holder-acc">
                        <div className="col-xs-2">Current password</div>
                        <div className="col-xs-1">:</div>
                        <div className="col-xs-9">
                            <input 
                                type="password"
                                className="form-control input-profile" 
                                placeholder="Please input" 
                                id="password" 
                                name="password" 
                                onChange={this.handleInput} 
                                value={this.state.password}
                            />

                            {this.validator.message( 'fillInYourCurrentPassword', this.state.newPassword, "required" )}
                        </div>
                    </div>

                    <div className="input-holder-acc">
                        <div className="col-xs-2">New password</div>
                        <div className="col-xs-1">:</div>
                        <div className="col-xs-9">

                            <input 
                                type="password" 
                                className="form-control input-profile" 
                                placeholder="Please input" 
                                id="newPassword" 
                                name="newPassword" 
                                onChange={this.handleInput} 
                                value={this.state.newPassword}
                            />

                            {this.validator.message( 'fillInYourNewPassword', this.state.newPassword, "required|max:15|min:6|pasw:key" )}
                        </div>
                    </div>

                    <div className="input-holder-acc">
                        <div className="col-xs-2">Retype new password</div>
                        <div className="col-xs-1">:</div>
                        <div className="col-xs-9">
                            <input 
                                type="password" 
                                className="form-control input-profile" 
                                placeholder="Please input" 
                                id="rePassword" 
                                name="rePassword" 
                                onChange={this.handleInput} 
                                value={this.state.rePassword}
                            />

                            {this.validator.message( 'retypeYourNewPassword', this.state.rePassword, "required|max:15|min:6|pasw:key" )}
                        </div>
                    </div>

                        <button style={{margin: "0 10px 0 0"}} className="btn-change-pasw" onClick={this.submitNewPass} >Submit</button>
                        <button className="btn-change-pasw" onClick={this.editClick}>Cancel</button>

                    </div>
                </div>
                
                <div className="clearfix"></div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.userDetail,
    api: state.user
});

export default connect(mapStateToProps)(AccountHolder);
