import React, { Component } from 'react';
import logo from '../../image/logo-TeLL.png';
import { connect } from "react-redux";
import icncross  from '../../image/X.svg';

class PopupSuccessVerifyEmail extends Component{
    constructor(props){
        super(props);

        this.callFunc = this.callFunc.bind(this);
    }

    callFunc(e) {
        this.props.close();
        window.location.pathname = "/";
    }

    render() {
        return(
            <div className="modal-ls animated slideInDown faster">
                <div className="modal-content-ls">
                    <div className="modal-ls-header">
                        <div className="container-fluid padding-0 logo center-block">
                            <img src={logo} className="center-block" width="92" height="56" alt="logo" />
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                Hello {this.props.forgotPwd.data.fullname},
                            </div>

                            <div className="row text-justify">
                                You have activated your account successfully.
                            </div>

                            <div className="clearfix">&nbsp;</div>

                            <div className="row">
                                <div className="col-xs-4">&nbsp;</div>
                                <div className="col-xs-4"><button name="singlebutton" onClick={this.callFunc}  className="btn btn-blue btn-md">Continue</button></div>
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
    user: state.user,
    forgotPwd: state.forgotPwd
});

export default  connect(mapStateToProps)(PopupSuccessVerifyEmail);