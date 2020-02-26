import React, { Component } from 'react';
import { Alert } from 'reactstrap';

import Header from '../../component/header';
import Footer from '../../component/footer';
import {verifyEmail}  from '../../__thedux/action/forgotPwdAction';
import { connect } from "react-redux";
import PopupSuccessVerifyEmail from "../../component/popupSuccessVerifyEmail"

class VerifyEmail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            popUp: false
        }

        this.closePopUp = this.closePopUp.bind(this)
    }

    componentWillMount(){
        this.props.dispatch(verifyEmail(this.props.match.params.id))
    }

    componentDidMount() {
        this.setState({
            popUp: true
        })
    }

    closePopUp() {
        this.setState({
            popUp: false
        })
    }

    render() {
        let popUp = '';

        if(!this.props.forgotPwd.data) {
            return (<div>Loading...</div>)
        }

        if(this.props.forgotPwd.data.error) {
            return (
                <div>
                    <Header />
                    
                    {popUp}

                    <div className="d-inline-flex min-height-450 p-2 row">
                        <div className="clear-fix">&nbsp;</div>
                        <div className="col-md-4">&nbsp;</div>
                        <div className="col-md-4 mt-4"><Alert color="danger text-center">{this.props.forgotPwd.data.message}</Alert></div>
                        <div className="col-md-4">&nbsp;</div>
                    </div>
                    <div style={{display: 'block', height: '460px'}}></div>
                    <Footer />
                </div>
            )
            
        } else {
            popUp = (this.state.popUp) ? <PopupSuccessVerifyEmail close={this.closePopUp} /> : null
        }

        return (
            <div>
                <div className="popup"><div className="box-ls">{popUp}</div></div>

                <Header {...this.props} />

                {/* <div className="d-inline-flex min-height-450 p-2 row">
                    <div className="clear-fix">&nbsp;</div>
                    <div className="col-md-4">&nbsp;</div>
                    <div className="col-md-4 mt-4"><Alert color="success text-center">Verify email succeed</Alert></div>
                    <div className="col-md-4">&nbsp;</div>
                </div> */}

                <div style={{display: 'block', height: '500px'}}></div>
                <Footer />
            </div>
        )
    }
}
const mapStateToProps = state => ({
    forgotPwd: state.forgotPwd,
});

export default connect(mapStateToProps)(VerifyEmail);
