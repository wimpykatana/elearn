import React, { Component } from "react";

class ProfileBar extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {
        return(
            <div className="profile-bar">
                <div className="progress-bar progress-bar-warning text-center" role="progressbar" style={{width: this.props.value+"%" }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>                                
                <span>{this.props.value}%</span>
            </div>
        )

    }
}

export default ProfileBar;