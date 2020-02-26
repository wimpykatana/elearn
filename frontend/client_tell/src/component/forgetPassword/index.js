import React, { Component } from 'react';
import { connect } from "react-redux";
import icnemail from '../../image/icn_email.png';
import icncross from '../../image/X.svg';
import {resetPassword} from '../../__thedux/action/forgotPwdAction';
import { Alert } from 'reactstrap';
import ReactGA from 'react-ga';
import config from '../../config/config.json';
import {regexEmail} from '../../utilis/regexEmail.js';

ReactGA.initialize(config.trackerId);

let resetpassword;
let formEmail;
let contentEmail;
let btnEmail;
let inputDisabled=false;
let style = {};

class ForgetPassword extends Component{
    constructor(props) {
        super(props)

        this.state = {
            emailReset:'',
            error: '',
            submitButton: false,
            enableButton: true,
        }

        this.onChangeEmailInput = this.onChangeEmailInput.bind(this);
        this.submitEmailReset = this.submitEmailReset.bind(this);
        this.reloadPage = this.reloadPage.bind(this);
        this.callFunction = this.callFunction.bind(this);
        this.enterSubmit = this.enterSubmit.bind(this);
    }

    onChangeEmailInput(e) {
        let value = e.target.value;
        const status = regexEmail(value);
        
        this.setState(prevState => {
            return prevState.enableButton = !status;
        });

        this.setState(prevState => {
            return prevState.emailReset = value;
        });
    }

    componentWillMount() {
        document.removeEventListener("keydown", this.enterSubmit, false);

        if(this.props.forgotPwd.data){
            this.props.dispatch({type: "CLEAR_VAR_RESET_PASS"});
        }
    }

    componentDidMount(){
        document.addEventListener("keydown", this.enterSubmit, false);
    }

   async submitEmailReset() {
        ReactGA.event({
            category: "Forgot Password",
            action: "Click",
            label: 'Submit Forgot Password Button'
        });

        // if(this.state.emailReset === '') {
        //     ReactGA.event({
        //         category: "Forgot Password",
        //         action: "Status update",
        //         label: "Failed Reset - required field"
        //     });

        //     return this.setState({
        //         error: 'Please fill out this field'
        //     });
        // }

        this.setState({
            submitButton: true,
            error: ''
        });

        let token = '';

        if(config.env === 'production') {
            token = await this.props.googleReCaptchaProps.executeRecaptcha("forgot_pass");
        }

        this.props.dispatch(resetPassword(this.state.emailReset, token));
    }

    enterSubmit(event) {
        if(event.keyCode === 13) {
            if(regexEmail(this.state.emailReset.trim())) {
                this.submitEmailReset();
            }
        }
    }

    reloadPage() {
        window.location.reload();
    }

    callFunction(e) {
        if(this.props.forgotPwd.sendEmail) {
            this.reloadPage();
        }

        ReactGA.event({
            category: "Forgot Password",
            action: "Click",
            label: 'Close button'
        });

        this.props.closePopup(e);
    }

    render() {
        if(this.state.submitButton) {
            btnEmail = <button name="" disabled className="singlebutton btn btn-blue btn-md btn-block">Wait...</button>
        }
        else {
            btnEmail = <button name="" onClick={this.submitEmailReset} disabled={(this.state.enableButton) ? 'disabled' : ''} className='singlebutton btn btn-blue btn-md text-uppercase btn-block'>Reset</button>
        }

        if(this.props.forgotPwd.status) {
            return(
                <div>Loading....</div>
            )
        }

        if(this.state.error !== '' || this.props.forgotPwd.data) {
            const propsPwd = this.props.forgotPwd

            resetpassword = <Alert color={(propsPwd.sendEmail) ? "success" : "danger"} className="text-center" isOpen={true}>
                <p>Check your email!</p>
                <p>We just sent a password reset link to your email.</p>
                {/* <p>{(this.props.forgotPwd.data) ? this.props.forgotPwd.data.message : this.state.error }</p> */}
            </Alert>
            inputDisabled = false;
            btnEmail = <button name="" onClick={this.submitEmailReset} className="singlebutton btn btn-blue btn-md text-uppercase btn-block">Reset</button>
        }
        else {
            resetpassword = '';
        }

        if(!this.props.forgotPwd.sendEmail) {
            formEmail = <div className="form-group form-full-ls">
                            <label className="sr-only" htmlFor="exampleInputAmount">Email / user name</label>
                                    
                            <div className="input-group input-group-ls">

                                <div className="input-group-addon input-group-addon-ls">
                                    <img src={icnemail} alt="icn-email" />
                                </div>

                                <input type="email" id="emailForgot" disabled={(inputDisabled)? "disabled" : ""} autoFocus name="emailReset" className="form-ls" value={this.state.emailReset} onChange={this.onChangeEmailInput} placeholder="Email / user name" />
                            </div>                                                                        
                        </div>

            contentEmail = <div className="form-group">
                            <div className="col-md-4 center-block"></div>

                            <div className="col-md-4">
                                {btnEmail}
                            </div>

                            <div className="col-md-4 center-block"></div> 
                        </div>
        }
        else {
            formEmail = '';
            contentEmail= '';
        }

        if(this.props.stl) {
            style = this.props.stl
        }

        return (
            <div className='popup' style={style}>
                <div className="box-ls">
                    <div className='animated slideInDown faster popup_inner modal-ls modal-content-ls'>
                        <div className="modal-ls-header">
                            <button type="button" className="close-ls" id="popupForget" onClick={this.callFunction} data-dismiss="modal" aria-hidden="true"><img src={icncross} alt="icon_cross" /></button>
                             <h4 className="modal-title">Forgot password</h4>
                        </div>

                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="form-inline">
                                        {resetpassword}

                                        {formEmail}
                                        {/* <div className="form-group form-full-ls">
                                            <label className="sr-only" htmlFor="exampleInputAmount">Email / user name</label>
                                                    
                                            <div className="input-group input-group-ls">

                                                <div className="input-group-addon input-group-addon-ls">
                                                    <img src={icnemail} alt="icn-email" />
                                                </div>

                                                <input type="text" name="emailReset" className="form-ls" value={this.state.emailReset} onChange={this.onChangeEmailInput} placeholder="Email / user name" />
                                            </div>                                                                        
                                        </div> */}
                                    </div>

                                    <div className="clearfix"></div>                                
                                </div>                            
                                        
                                <div className="row">
                                    {contentEmail}
                                </div>                            
                            </div>
                        </div>                    
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    forgotPwd: state.forgotPwd,
});

export default connect(mapStateToProps)(ForgetPassword);