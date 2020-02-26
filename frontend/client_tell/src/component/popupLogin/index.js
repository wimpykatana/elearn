import React, { Component } from 'react';
import './style.css';
import Login from '../../screen/login';

// eslint-disable-next-line
let style = {}

class PopupLogin extends Component{
    constructor(props){
        super(props);

        this.state = {
            showResetPassword: false,
        }
    }

    render() {
        if(this.props.stl) {
            style = this.props.stl
        }

        return (
            <div className='popup' style={this.props.stl}>
                <div className="box-ls">
                    <div className='animated slideInDown faster popup_inner modal-ls'>
                        <Login {...this.props} closeForm={this.props.closePopup} />
                    </div> 
                </div>
            </div>
        )
    }

}

export default PopupLogin;