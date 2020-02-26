import React, { Component } from "react";
import "./style.css";

class NameInitial extends Component{
    constructor(props){
        super(props);
        this.state = {
           
        }

    }

    render(){
        return(
            <div className="file-upload-holder">
                <button className="file-upload">
                    <div className="image-upload-wrap">
                        {this.props.value}
                    </div>
                </button>
            </div>
        )
    }

}

export default NameInitial;
