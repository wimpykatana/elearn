import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import image404 from './404.png';

import ReactGA from 'react-ga';
import config from '../../config/config';

//ReactGA.initialize(config.trackerId);
//ReactGA.pageview(window.location.pathname);

class Notfound extends Component{
    render() {
        return(
                 	
            <div className="container">
    		    <div className="clearfix">&nbsp;</div>
            <div className="clearfix">&nbsp;</div>
            <div className="clearfix">&nbsp;</div>
            <div className="clearfix">&nbsp;</div>  
            <div className="clearfix">&nbsp;</div>
            <div className="clearfix">&nbsp;</div>  	 
        	  <img src={image404} className="center-block" alt="image404" />   
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

export default Notfound;