import passinc from '../../image/icn_password.png';
import Loader from '../../component/loading';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { onlogin} from '../../__thedux/action/userAction';
import { Alert } from 'reactstrap';
import './style.css';
import icnemail from '../../image/icn_email.png'
import icncross  from '../../image/X.svg'
import GLogin from '../../component/googleLogin';
import FLogin from '../../component/facebookLogin';
import ReactGA from 'react-ga';
import config from '../../config/config.json';
import {regexEmail} from '../../utilis/regexEmail'

ReactGA.initialize(config.trackerId);

let errmessage;
let message = [];
let resetpassword; // eslint-disable-line no-unused-vars
let inputClass1 = "form-ls";
let inputClass2 = "form-ls";
let enableButton = false;
let textLogin = "Log In";

class Login extends Component{
    constructor(props){
        super(props);
        this.state ={
            isLoading: false,
            message: "",
            visibleMessage: true,
            user: {
                email: (localStorage.getItem("username")) ? localStorage.getItem("username") : "",
                password: "",
                remember: (localStorage.getItem("username")) ? true : false
            },
            errorLogin: {
                show: false,
                message: ''
            },
            reset:false
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.redirect = this.redirect.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.init = this.init.bind(this);
        this.enterFunction = this.enterFunction.bind(this);
        this.onCloseForm = this.onCloseForm.bind(this);
        this.clickSignup = this.clickSignup.bind(this);
        this.clickForgotPass = this.clickForgotPass.bind(this);
    }

    componentWillMount() {
        document.removeEventListener("keydown", this.enterFunction, false);
        this.props.dispatch({type: "CLEAR_USER"});
    }

    componentDidMount(){
        document.addEventListener("keydown", this.enterFunction, false);
    }

    enterFunction(event) {
        if(event.keyCode === 13 && event.target.getAttribute('id') !== 'emailForgot') {
            if(regexEmail(this.state.user.email.trim()) && this.state.user.password.trim().length >= 5) {
                this.onLogin();
            }
        }
    }

    onDismiss() {
        // this.setState({ visibleMessage: false });

        this.setState(prevState => ({
            visibleMessage: !prevState.visibleMessage
        }));

        errmessage = null;
    }

    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;

        this.setState(
          prevState => ({
            user: {
              ...prevState.user,
              [name]: value
            }
          })
        );
    }

    handleCheckBox(e){
        if(this.state.user.remember) {
            ReactGA.event({
                category: "Login",
                action: "Click",
                label: 'Remember me - uncheck'
            });

        } else {
            ReactGA.event({
                category: "Login",
                action: "Click",
                label: 'Remember me - check'
            });
        }

        this.setState(
            prevState => ({
            user:{
                ...prevState.user,
                remember: !this.state.user.remember
            }
        })
        );
    }

    async onLogin() {
        message = [];

        ReactGA.event({
            category: "Login",
            action: "Click",
            label: 'Submit login button'
        });

        if(this.state.user.email === '') {
            inputClass1 = 'input-required';
        }
        else {
            inputClass1 = "form-ls";
        }

        if(this.state.user.password === '') {
            inputClass2 = 'input-required';
        }
        else {
            inputClass2 = "form-ls";
        }

        if(this.state.user.email === '' || this.state.user.password === '') {
            this.setState({
                errorLogin: {
                    show: true,
                    msg: 'Email and Password must be filled'
                }
            });

            ReactGA.event({
                category: "Login",
                action: "Status Update",
                label: "Failed Login - required fields"
            });

           return message.push('Email and Password must be filled')
        }

        if(this.state.user.email === '' || this.state.user.password === ''){
            return;
        }

        this.setState({visibleMessage: true});

        let token = '';

        if(config.env === 'production') {
            this.props.dispatch({type: "START_LOGIN"});
            token = await this.props.googleReCaptchaProps.executeRecaptcha("login");
        }

        this.props.dispatch(onlogin(this.state.user.email, this.state.user.password, this.state.user.remember, token));

        this.setState({
            errorLogin: {
                show: false,
                msg:''
            }
        });
    }

    redirect(){
        setTimeout(function(){ window.location.replace("/") }, 100);
    }

    onCloseForm () {
        ReactGA.event({
            category: "Login",
            action: "Click",
            label: 'Close Button'
        });
    }

    clickSignup() {
        ReactGA.event({
            category: "Sign up",
            action: "Click",
            label: 'Secondary sign up button'
        });
    }

    clickForgotPass() {
        ReactGA.event({
            category: "Forgot Password",
            action: "Click",
            label: 'Main Forgot Password Button'
        });
    }

    init() {
        if(this.state.errorLogin.show) {
            let data =  message.map((item, index) => {
                return (<li key={index}>{item}</li>);
            });

            errmessage =
                <Alert color="danger" isOpen={this.state.visibleMessage}>
                    <ul className="error-ul" >{data}</ul>
                </Alert>

            if(message.length === 1){
                errmessage =
                    <Alert color="danger" className="text-center" isOpen={this.state.visibleMessage}>
                        <p>{message[0]}</p>
                    </Alert>
            }
        }
        else if (this.props.user.data && !this.props.user.islogin) {
            errmessage =
                <Alert color="danger" className="text-center" isOpen={this.state.visibleMessage}>
                    <p>{this.props.user.data.message}</p>
                </Alert>
        }
        else {
            errmessage='';
        };

        //if(this.props.user.data) {
            // resetpassword =
            //                 <div className="popover-ls text-center">
            //                     {(this.props.user.data) ? this.props.user.data.message : this.state.errorResetPass.message}
            //                 </div>;
        //}
       // else {
            //resetpassword = null;
       // }

        //if(this.props.user.data && this.props.user.sendEmail) {
            // resetpassword =
            // <Alert color="info" isOpen={this.state.visibleMessage}>
            //     <p>{this.props.user.data.message}</p>
            // </Alert>;
       // }
        //else {
           // resetpassword = null;
        //}
    }

    render() {
        this.init();

        if(regexEmail(this.state.user.email.trim()) && this.state.user.password.trim().length >= 5) {
            enableButton = true;
        }
        else {
            enableButton = false;
        }

        const {
            isLoading
        } = this.state;

        if(isLoading){
            return(
                <Loader/>
            )
        }

        if(this.props.user.islogin) {
            this.redirect();
            return(
                <div style={{height:'100%'}}>
                    <Loader title={"Login Success"} />
                </div>
            )
        }

        if(this.props.user.fetching) {
            textLogin = 'Waiting...';
        } else {
            textLogin = 'Log In';
        }

        // login form
        return (
            <div className='login-page-holder modal-content-ls'>
                <div className="modal-ls-header">
                    <Link to="" type="button" onClick={(e) => {this.props.closeForm(e); this.onCloseForm()}} id="popupLogin" className="close-ls" data-dismiss="modal" aria-hidden="true"><img width="22" height="22" src={icncross} alt="icon-cross" /></Link>
                    <h4 className="modal-title">Log in to your TELL account</h4>
                </div>

                <div className="modal-body" style={{opacity: (this.props.user.fetching) ? "0.5" : "1"}}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="form-inline">

                                {errmessage}

                                <div className="form-group form-full-ls">
                                    <label className="sr-only" htmlFor="exampleInputAmount">Email / user name</label>
                                    <div className="input-group input-group-ls">
                                        <div className="input-group-addon input-group-addon-ls">
                                            <img src={icnemail} alt="icon_email" />
                                        </div>
                                        <input  disabled={(this.props.user.fetching) ? 'disabled' : ''} autoFocus autoComplete="off" type="email" name="email" value={this.state.user.email} onChange={this.handleInput} className={inputClass1} placeholder="Email" />
                                    </div>
                                </div>
                                {/*
                                    <div className="popover-ls">
                                    Please fill out this field
                                    </div>
                                */}
                            </div>
                            <div className="clearfix"></div>
                            <div className="form-inline">
                                <div className="form-group form-full-ls">
                                    <label className="sr-only" htmlFor="exampleInputAmount">Password</label>
                                    <div className="input-group input-group-ls">
                                        <div className="input-group-addon input-group-addon-ls">
                                            <img src={passinc} alt="icon_pass" />
                                        </div>
                                        <input autoComplete="off" disabled={(this.props.user.fetching) ? 'disabled' : ''} type="password" name="password" value={this.state.user.password} onChange={this.handleInput} className={inputClass2} placeholder="Password" />
                                    </div>
                                </div>
                                {/* <div className="popover-ls">
                                    Please fill out this field
                                </div> */}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6 col-md-6">
                                <label className="customcheck">Remember me
                                    <input name="remember" disabled={(this.props.user.fetching) ? 'disabled' : ''} onClick={this.handleCheckBox} value={this.state.user.remember} type="checkbox" defaultChecked={(this.state.user.remember) ? "checked" :""} />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                            <div className="col-xs-6 col-md-6 text-right">
                                <div style={{cursor: "pointer"}} onClick={(e)=> {this.props.closeForm(e); this.clickForgotPass()}} id="popupForget" >Forgot Password</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group">
                                <div className="col-md-4 center-block"></div>
                                <div className="col-md-4">
                                    <button name="singlebutton" disabled={(enableButton && !this.props.user.fetching) ? '' : 'disabled'} onClick={this.onLogin} className="btn btn-blue btn-md text-uppercase btn-block">{textLogin}</button>
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
                        {/*
                        ----------------------------------------------------------------------   THIS IS SOCIAL NETWORK LOGIN
                        <div className="row">
                            <h5 className="text-ls"><span>Or log in with</span></h5>
                        </div>
                        <div className="row" style={{ display: "flex",  alignItems: "center",  justifyContent: "space-around" }}>
                            <FLogin/>
                            <GLogin />
                        </div>*/}

                    </div>
                </div>

                <div className="modal-footer">
                    <div className="col-sm-10 col-offset-6 centered">
                    <span>Don't have an account? &nbsp;</span>
                    <button disabled={(this.props.user.fetching) ? 'disabled' : ''} type="button" onClick={(e)=> {this.props.closeForm(e); this.clickSignup();}} id="popupSignup" className="btn btn-orange btn-md text-uppercase">Sign Up</button>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default  connect(mapStateToProps)(Login);
