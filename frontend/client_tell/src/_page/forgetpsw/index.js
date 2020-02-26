import React, { Component } from 'react';
import Header from '../../component/header';
import Footer from '../../component/footer';
import icnkey from '../../image/icn-key.png';
import { connect } from "react-redux";
import { checkTokenForgotPwd } from "../../__thedux/action/forgotPwdAction";
import { resetPwd } from '../../__thedux/action/forgotPwdAction';
import { Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
import config from'../../config/config.json';

let errMsg;

class Forgetpsw extends Component{
    constructor(props){
        super(props);

        this.state = {
            password:'',
            password_confirmation: '',
            error: {
                show: false,
                message: ''
            },
            token:props.match.params.token

        }

        this.onChange = this.onChange.bind(this);
        this.submitResetPassword = this.submitResetPassword.bind(this);
    }

    componentWillMount(){
        const token = this.props.match.params.token;

        this.props.dispatch(checkTokenForgotPwd(token));
    }

    onChange(e){
        let value = e.target.value;
        let name = e.target.name;

        this.setState((prevState) => prevState[name] = value);

    }

    async submitResetPassword() {
        if(!this.state.password || this.state.password === null || this.state.password === '') {
            return this.setState({
                error: {
                    show: true,
                    message: 'Please fill out this field'
                }
            });
        }

        if(!this.state.password || this.state.password === null || this.state.password === '') {
            return this.setState({
                error: {
                    show: true,
                    message: 'Please fill out this field'
                }
            });
        }

        if(this.state.password !== this.state.password_confirmation) {
            return this.setState({
                error: {
                    show: true,
                    message: 'Passwords do not match'
                }
            });
        }
        const data = {
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        }

        let token = '';

        if(config.env === 'production') {
            token = await this.props.googleReCaptchaProps.executeRecaptcha("submit_forget_pass");
        }
       
        this.props.dispatch(resetPwd(this.state.token, data, token));
    }

    render() {
        if(this.props.forgotPwd.loading){
            return (
                <div>
                    <Header  {...this.props} />
                    <div>Loading....</div>
                    <Footer />
                </div>
            )
        }

        // jika token tidak valid, expire, atau sudah di klik
        if(this.props.forgotPwd.error && this.props.forgotPwd.status === 'cek_token') {
            return (<div>
                    <Header {...this.props} />

                    <div className="d-inline-flex min-height-450 p-2 row">
                        <div className="clear-fix">&nbsp;</div>
                        <div className="col-md-4">&nbsp;</div>
                        <div className="col-md-4"><Link to={`/`} target="_self" >Go Back HOME</Link></div>
                        <div className="col-md-4">&nbsp;</div>
                    </div>

                    <div style={{display: 'block', height: '460px'}}></div>
                    <Footer/>
                    
                </div>)
            // return (
            //     <div>
            //         <Header {...this.props} />
            //         <div className="d-inline-flex min-height-450 p-2 row">
            //             <div className="clear-fix">&nbsp;</div>
            //             <div className="col-md-4">&nbsp;</div>
            //             <div className="col-md-4 mt-4"><Alert color="danger text-center">{this.props.forgotPwd.data.message}</Alert></div>
            //             <div className="col-md-4">&nbsp;</div>
            //         </div>
            //         <div style={{display: 'block', height: '460px'}}></div>
            //         <Footer />
            //     </div>
            // )
        }

        //jika validasi salah
        if(this.state.error.show || (this.props.forgotPwd.error && this.props.forgotPwd.status === 'update_pwd')) {
            errMsg = <div className="popover-ls text-center">
                        {(this.props.forgotPwd.status === 'update_pwd') ? this.props.forgotPwd.data.message : this.state.error.message}
                    </div>
        }
        else {
            errMsg = null;
        }

        //jika password sudah di update
        if(this.props.forgotPwd.data && this.props.forgotPwd.data.update) {
            return (
                <div>
                    <Header {...this.props} />

                    <div className="d-inline-flex min-height-450 p-2 row">
                        <div className="clear-fix">&nbsp;</div>
                        <div className="col-md-4">&nbsp;</div>
                        <div className="col-md-4"><Alert color="success">Your Password changed successfully</Alert></div>
                        <div className="col-md-4">&nbsp;</div>
                    </div>

                    <div style={{display: 'block', height: '460px'}}></div>
                    <Footer/>
                    
                </div>
            )
        }

        // jika klik forgot password form in page forgot password
        if(!this.props.forgotPwd.info){
            return (
                <div>
                    <Header {...this.props} />

                    <div className="d-inline-flex min-height-450 p-2 row">
                        <div className="clear-fix">&nbsp;</div>
                        <div className="col-md-4">&nbsp;</div>
                        <div className="col-md-4"><Link to={`/`} target="_self" >Go Back HOME</Link></div>
                        <div className="col-md-4">&nbsp;</div>
                    </div>

                    <div style={{display: 'block', height: '460px'}}></div>
                    <Footer/>
                    
                </div>
            )
        }

        return (
            <div>
                <Header {...this.props} />

                <div className="box-ls">
                    <div className="modal-ls">
                
                        <div className="modal-content-ls">
                            <div className="modal-ls-header">
                                {/* <button type="button" className="close-ls" data-dismiss="modal" aria-hidden="true">&nbsp;</button> */}
                                <h4 className="modal-title">Change password</h4>
                            </div>

                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="clearfix"></div>
                                    
                                    {errMsg}

                                    <form className="form-inline">
                                        <div className="form-group form-full-ls">
                                            <label className="sr-only" htmlFor="exampleInputAmount">New password</label>

                                            <div className="input-group input-group-ls">

                                                <div className="input-group-addon input-group-addon-ls">
                                                    <img src={icnkey} alt="icn-key" />
                                                </div>

                                                <input onChange={this.onChange} autocomplete="off" type="password"  value={this.state.password} name="password" className="form-ls" placeholder="New password" />
                                            </div>
                                        </div>

                                        <div className="popover-ls">
                                           {/*Lorem ipsum dolor */}
                                        </div>                            	
                                    </form>

                                    <div className="clearfix"></div>
                    
                                    <form className="form-inline">
                                        <div className="form-group form-full-ls">
                                            <label className="sr-only" htmlFor="exampleInputAmount">Re-enter new password</label>
                                            
                                            <div className="input-group input-group-ls">
                                                <div className="input-group-addon input-group-addon-ls">
                                                    <img src={icnkey} alt="inc-key" />
                                                </div>
                    
                                                <input onChange={this.onChange} type="password" name="password_confirmation" value={this.state.password_confirmation} className="form-ls" placeholder="Re-enter new password" />
                                            </div>
                                        </div>

                                        <div className="popover-ls">
                                        {/*Lorem ipsum dolor */}
                                        </div>                            	
                                    </form>                                
                                </div>

                                <div className="row">
                                    <div className="form-group">
                                        <div className="col-md-4 center-block"></div>
                                        
                                        <div className="col-md-4">
                                            <button name="singlebutton" onClick={this.submitResetPassword} className="btn btn-blue btn-md text-uppercase btn-block">Reset</button>
                                        </div>

                                        <div className="col-md-4 center-block"></div> 
                                    </div>
                                </div>                            
                            </div>
                        </div>                    
                        </div>
                    </div>
                </div>
                <div style={{display: 'block', height: '620px'}}></div>
                
                <div>
                    <Footer/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    forgotPwd: state.forgotPwd,
});

export default connect(mapStateToProps)(Forgetpsw);