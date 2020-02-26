import React, { Component } from 'react';
import logo from '../../image/logo-TeLL.png';
import { connect } from "react-redux";
import icncross  from '../../image/X.svg';

class PopupAfterSignup extends Component{
    constructor(props){
        super(props);

        this.callFunc = this.callFunc.bind(this);
    }

    callFunc(e) {
        this.props.closeForm(e);
        window.location.reload();
    }

    render() {
        return(

            <div className="modal-ls animated slideInDown faster">
             {/* <div className="animated slideInDown faster login-page-holder modal-content-ls">
            <div className="modal-ls-header">
                <div className="container-fluid padding-0">
                    <button type="button" onClick={this.callFunc} id="popupSignup" className="close-ls" data-dismiss="modal" aria-hidden="true" style={{marginTop:8}}><img width="22" height="22" src={icncross} alt="icon-cross"/></button>
                    <img src={logo} className="pull-left" width="92" height="56" alt="logo" />
                </div>
            </div>
            <div className="modal-body">
                <div className="container-fluid">
                    <div className="row">
                        Hello {this.props.user.signupData.fullname}
                    </div>
                    <div className="row text-justify">
                        Congratulations, you have successfully registered with us.<br /><br />
                        To start learning, please check your email and activate your account.
                    </div>                            
                    <div className="row">
                        TELL - structured learning with better experience.
                    </div> 
                    <div className="clearfix">&nbsp;</div>                                                       
                </div>
            </div> */}
                <div className="modal-content-ls">
                    <div className="modal-ls-header">
                        <div className="container-fluid padding-0 logo center-block">
                            <img src={logo} className="center-block" width="92" height="56" alt="logo" />
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                Hello {this.props.user.signupData.fullname},
                            </div>

                            <div className="row text-justify">
                                Congratulations, you have successfully registered with us.<br /><br />
                                Please check your email and activate your account through the link provided.
                            </div>

                            <div className="clearfix">&nbsp;</div>

                            <div className="row">
                                <div className="col-xs-4">&nbsp;</div>
                                <div className="col-xs-4"><button name="singlebutton" onClick={this.callFunc}  className="btn btn-blue btn-md">Go to home</button></div>
                                <div className="col-xs-4">&nbsp;</div>
                            </div>

                            <div className="clearfix">&nbsp;</div>                                                      
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    user: state.user
});

export default  connect(mapStateToProps)(PopupAfterSignup);