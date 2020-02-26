import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Redirect extends Component {
    componentWillMount() {
        if(this.props.me) {
            this.props.history.push('/Home-Page')
        }
        else {
            this.props.history.push('/Landing-Page')
        }
    }

    render () {
        return (
            <div className="container">
    		    <div className="clearfix">&nbsp;</div>
                <div className="clearfix">&nbsp;</div>
                <div className="clearfix">&nbsp;</div>
                <div className="clearfix">&nbsp;</div>  
                <div className="clearfix">&nbsp;</div>
                <div className="clearfix">&nbsp;</div>
                <div className="col-lg-5 col-md-5 col-sm-4 col-sx-12">&nbsp;</div>
                <div className="col-lg-2 col-md-2 col-sm-4 col-sx-12">
                    <Link to="/" className="btn btn-block btn-blue btn-md" target="_self">Back to home</Link>
                </div>
                <div className="col-lg-5 col-md-5 col-sm-4 col-sx-12">&nbsp;</div>
            </div>     
        )
    }
 
}

export default Redirect