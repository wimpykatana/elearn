import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
import Trimegah from '../../image/trimegah.png';


export default class Footer extends Component {
    render() {
        return (
            <footer className="footer-area">
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">                       
                                <div className="pull-left col-sm-6 hidden-xs hidden-sm">

                                <a href="http://www.trimegah.com/" target="_blank" rel="noopener noreferrer"><img src={Trimegah} alt="trimegah" /></a>
                                </div>                          
    
                                <ul className="pull-right col-sm-6 hidden-xs hidden-sm">
                                    <li className="margin-0"><a href="/about">About Tell</a></li>
                                    <li className="margin-5"><a href="/help">Help Center</a></li>
                                    <li style={{margin:"0 5px 0 0"}}><a href="/termus">TERMS AND CONDITIONS</a></li>
                                    <li className="margin-0"><a href="/contactus">Contact Us</a></li>
                                <p className="text-right">© 2019 TELL</p>
                            </ul>                                                                                                                                       

                                <ul className="col-xs-12 hidden visible-xs visible-sm padding-0">
                                    <li><a href="/about">About Tell</a></li>
                                    <li><a href="/help">Help Center</a></li>
                                    <li><a href="/termus">Terms and Conditions</a></li>
                                    <li><a href="/contactus">Contact Us</a></li>
                                </ul>                       

                                <p className="col-xs-12 hidden visible-xs visible-sm text-center">© 2019 TELL v1.0</p>

                                <div className="clearfix">&nbsp;</div>

                                <div className="col-xs-12 hidden visible-xs visible-sm text-center">
                                    <a href="http://www.trimegah.com/" target="_blank" rel="noopener noreferrer"><img src={Trimegah} alt="trimegah"  /></a>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12"> 
                                <div className="col-xs-12">
                                    <div className="text-right visible-lg visible-md">
                                        <small>This site is protected by reCAPTCHA and the Google
                                            <a href="https://policies.google.com/privacy" target="_blank">&nbsp;Privacy Policy</a> and
                                            <a href="https://policies.google.com/terms" target="_blank">&nbsp;Terms of Service</a> apply.
                                        </small>
                                    </div>
                                    <div className="text-center visible-xs visible-sm list-inline line-normal">
                                        <div className="clearfix">&nbsp;</div>
                                        <small>This site is protected by reCAPTCHA and the Google
                                            <a href="https://policies.google.com/privacy" target="_blank">&nbsp;Privacy Policy</a> and
                                            <a href="https://policies.google.com/terms" target="_blank">&nbsp;Terms of Service</a> apply.
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer> 
        )
    }
}

