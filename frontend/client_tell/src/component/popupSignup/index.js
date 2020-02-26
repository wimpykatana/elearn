import React, { Component } from 'react';
//import './style.css';
import Signup from '../../screen/signup';

let style = {}

class PopupSignup extends Component{
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

        return(
            <div className='popup' style={style} >
                <div className="box-ls">
                    <div className='animated slideInDown faster popup_inner modal-ls'>
                        <Signup {...this.props} closeForm={this.props.closePopup} />
                    </div>
                </div>
            </div>
        )
    }

}

export default PopupSignup;