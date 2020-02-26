import { Link } from 'react-router-dom';
import fullnameinc from '../../image/icn_fullname.png';
import emailinc from '../../image/icn_email.png';
import passinc from '../../image/icn_password.png';
import ReactGA from 'react-ga';
import config from '../../config/config.json';
import React, { Component } from 'react';
import './style.css';
import { connect } from "react-redux";
import { Alert } from 'reactstrap';
import { signup } from '../../__thedux/action/userAction'
import PopupAfterSignup from '../../component/popAfterSignup/index';
import icncross  from '../../image/X.svg';
import {regexEmail} from '../../utilis/regexEmail';

ReactGA.initialize(config.trackerId);

let errmessage;
let message = [];

let inputClass1 = "form-ls";
let inputClass2 = "form-ls";
let inputClass3 = "form-ls";
let enableButton = false;
let textSubmit = "Sign Up";

class Signup extends Component{
    constructor(props){
        super(props);

        this.state ={
            isLoading: false,
            message: "",
            error: {
                show: false,
                msg: ''
            },
            newUser: {
                fullName: "",
                email: "",
                password: "",
                newsletter: true
            }
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
        this.onSignup = this.onSignup.bind(this);
        this.enterFunction = this.enterFunction.bind(this);
        this.onClicktnc = this.onClicktnc.bind(this);
        this.onCloseForm = this.onCloseForm.bind(this);
        this.clickLogin = this.clickLogin.bind(this);
    };

    componentWillMount(){
        document.removeEventListener("keydown", this.enterFunction, false);
    }

    componentDidMount(){
        document.addEventListener("keydown", this.enterFunction, false);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    enterFunction(event) {
        if(event.keyCode === 13) {
            if((regexEmail(this.state.newUser.email.trim()) && this.state.newUser.password.trim().length >= 5) && this.state.newUser.fullName.trim().length >= 3) {
                this.onSignup();
            }
        }
    }

    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;

       
        if(name === 'fullName' && value.length < 3) {
            inputClass1 = "input-required";
        } else{
            inputClass1 = "form-ls";
        }

        if(name === 'email' && !regexEmail(value)) {
            inputClass2 = "input-required";
        } else{
            inputClass2 = "form-ls";
        }

        if(name === 'password' && value.length < 5) {
            inputClass3= "input-required";
        } else{
            inputClass3 = "form-ls";
        }
     
        this.setState(
          prevState => ({
            newUser: {
              ...prevState.newUser,
              [name]: value
            }
          })
          );
    }

    handleCheckBox(){
        this.setState(
            prevState => ({
                newUser:{
                    ...prevState.newUser,
                    newsletter: !this.state.newUser.newsletter
                }
            })
        );
    }

    onClicktnc() {
        ReactGA.event({
            category: "Sign up",
            action: "Click",
            label: 'T & C button'
        });
    }

    onCloseForm() {
        ReactGA.event({
            category: "Sign up",
            action: "Click",
            label: 'Close button'
        });
    }

    clickLogin() {
        ReactGA.event({
            category: "Login",
            action: "Click",
            label: 'Secondary login button'
        });
    }

    async onSignup() {
        if(this.props.user.fetching) {
            return;
        }

        message = [];

        ReactGA.event({
            category: "Sign up",
            action: "Click",
            label: 'Submit sign up button'
        });

        if(this.state.newUser.fullName === '' || this.state.newUser.email === '' || this.state.newUser.password === '') {
            this.setState({
                error: {
                    show: true,
                    msg: 'Full name must be filled'
                }
            });

            message.push('Please complete all required fields');

            ReactGA.event({
                category: "Sign up",
                action: "Status update",
                label: 'Failed Signup - required fields'
            });
    
        }

        if(this.state.newUser.fullName === '') {
            inputClass1 = "input-required";
        }
        else {
            inputClass1 = "form-ls";
        }

        if(this.state.newUser.email === '') {
            inputClass2 = "input-required";
        }
        else {
            inputClass2 = "form-ls";
        }

        if(this.state.newUser.password === '') {
            inputClass3 = "input-required";
        }
        else{
            inputClass3 = "form-ls";
        }

        if(this.state.newUser.fullName === '' || this.state.newUser.email === '' || this.state.newUser.password === '') {
            return;
        }

        let token = '';

        if(config.env === 'production') {
            this.props.dispatch({type: "START_SIGNUP"});
            token = await this.props.googleReCaptchaProps.executeRecaptcha("homepage");
        }
        
        this.props.dispatch(signup(this.state.newUser, token));

        this.setState({
            error: {
                show: false,
                msg: ''
            }
        });
    }

    render() {
        if((regexEmail(this.state.newUser.email.trim()) && this.state.newUser.password.trim().length >= 5) && this.state.newUser.fullName.trim().length >= 3) {
            enableButton = true;
        }
        else {
            enableButton = false;
        }

        if(this.props.user.signup) {
            return (
                <PopupAfterSignup closeForm={this.props.closeForm} />
            )
        }

        if(this.props.user.fetching) {
            textSubmit = "Waiting..."
        }
        else {
            textSubmit = "Sign Up"
        }

        if(this.state.error.show) {

            const data = message.map((item, index) => {
                return (<li key={index}>{item}</li>);
            });

            errmessage =   
                <Alert color="danger" isOpen={this.state.visibleMessage}>
                    <ul className="error-ul">{data}</ul>
                </Alert>

            if(message.length === 1) {
                errmessage = <Alert color="danger" className="text-center" isOpen={this.state.visibleMessage}>
                    <p>{message[0]}</p>
                </Alert>
            }
        }
        else if(this.props.user.signupData && !this.props.user.signup) {
            errmessage =   
                <Alert color="danger" className="text-center" isOpen={this.state.visibleMessage}>
                    <p>{this.props.user.signupData.message}</p>
                </Alert>
        }
        else {
            errmessage='';
        };

        return(
            <div className="login-page-holder modal-content-ls">
                <div className="modal-ls-header">
                    <Link type="button" to="" onClick={(e)=> {this.props.closeForm(e);this.onCloseForm();}} id="popupSignup" className="close-ls" data-dismiss="modal" aria-hidden="true"><img width="22" height="22" src={icncross} alt="icn-cross" /></Link>
                    <h4 className="modal-title">Your learning journey starts here</h4>
                </div>

                <div className="modal-body" style={{opacity: (this.props.user.fetching) ? "0.5" : "1"}}>
                    <div className="container-fluid">
                        <div className="row">
                            {errmessage}

                            <div className="form-inline">
                                <div className="form-group form-full-ls">
                                    <label className="sr-only" htmlFor="exampleInputAmount">Full name</label>
                                    <div className="input-group input-group-ls">
                                        <div className="input-group-addon input-group-addon-ls">
                                            <img src={fullnameinc} alt="icon_fullname" />
                                        </div>
                                        <input autoFocus autoComplete="off" type="text" disabled={(this.props.user.fetching) ? "disabled" : ''} name="fullName" value={this.state.newUser.fullName} onChange={this.handleInput} className={inputClass1} placeholder="Full name" />                                    
                                    </div>                                
                                </div>    
                                {/* <div className="popover-ls">
                                    Please fill out this field
                                </div>                        	 */}
                            </div>
                            <div className="clearfix"></div>
                            <div className="form-inline">
                                <div className="form-group form-full-ls">
                                    <label className="sr-only" htmlFor="exampleInputAmount">Email </label>
                                    <div className="input-group input-group-ls">
                                        <div className="input-group-addon input-group-addon-ls">
                                            <img src={emailinc} alt="icon_email" />
                                        </div>
                                        <input type="email" disabled={(this.props.user.fetching) ? "disabled" : ''} autoComplete="off" name="email" value={this.state.newUser.email} onChange={this.handleInput} className={inputClass2} placeholder="Email" />                                    
                                    </div>                                
                                </div>    
                                {/* <div className="popover-ls">
                                    Please fill out this field
                                </div>                        	 */}
                            </div>
                            <div className="clearfix"></div>
                            <div className="form-inline">
                                <div className="form-group form-full-ls">
                                    <label className="sr-only" htmlFor="exampleInputAmount">Password</label>
                                    <div className="input-group input-group-ls">
                                        <div className="input-group-addon input-group-addon-ls">
                                            <img src={passinc} alt="icon_password" />
                                        </div>

                                        <input type="password" disabled={(this.props.user.fetching) ? "disabled" : ''} autoComplete="off" name="password" value={this.state.newUser.password} onChange={this.handleInput} className={inputClass3} placeholder="Password" />
                                    </div>
                                </div>                            	
                            </div>
                        </div>
                        {/* <div className="row">
                            <div className="col-xs-12">
                                <label className="customcheck">I don’t want to miss any exclusive deals or learning tips
                                    <input defaultChecked={this.state.newUser.newsletter} onClick={this.handleCheckBox} type="checkbox" />
                                    <span className="checkmark"></span>
                                </label>
                            </div>                                
                        </div> */}
                        <div className="row">
                            <div className="form-group">
                                <div className="col-md-4 center-block"></div>
                                <div className="col-md-4">
                                    <button name="singlebutton" onClick={this.onSignup} disabled={(enableButton && !this.props.user.fetching) ? '' : 'disabled'} className="btn btn-orange btn-md text-uppercase btn-block">{textSubmit}</button>
                                </div> 
                                <div className="col-md-4 center-block"></div> 
                            </div>
                        </div>

                        <div className="row alert">
                            <small>This site is protected by reCAPTCHA and the Google
                            <a href="https://policies.google.com/privacy">Privacy Policy</a> and
                            <a href="https://policies.google.com/terms">Terms of Service</a> apply.
                            </small>                           
                        </div>
                        {/* <div className="row">
                            <h5 className="text-ls"><span>Or sign up with</span></h5>
                        </div>
                        <div className="row">
                            <button id="" className="btn btn-block btn-white" type="button">
                                <i className="btn-white-facebook"></i> Facebook
                            </button>
                            <button id="" className="btn btn-block btn-white" type="button">
                                <i className="btn-white-google"></i> Google
                            </button>
                        </div> */}
                        <div className="clearfix">&nbsp;</div>
                        <div className="row">
                            <div onClick={this.props.closeForm} id="popupSignin" className="col-xs-12 text-center">
                                By signing up, you agree to our <Link to="/termus" onClick={this.onClicktnc} target="_self">Terms & Conditions</Link>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="modal-footer">
                    <div className="col-sm-11 col-offset-5 centered">
                    <span>Do you already have an account? &nbsp;</span>
                    <button type="button" onClick={(e)=> {this.props.closeForm(e); this.clickLogin();}} id="popupLogin" className="btn btn-blue btn-md text-uppercase">LOG IN</button>
                    </div>
                </div>
            </div>
        )
    };

}

const mapStateToProps = state => ({
    user: state.user
});

export default  connect(mapStateToProps)(Signup);