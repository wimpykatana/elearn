import React from 'react';
import './loader.css';

class Loader extends React.Component{
    

    render(){
        return(
            <div className="loader">
                <h1>{this.props.title ? this.props.title : "LOADING"}</h1>
                <span></span>
                <span></span>
                <span></span>
            </div>
        )
    }

}

export default Loader;
