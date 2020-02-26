import React, { Component } from 'react';
import logoTrim from '../../../images/logo-trimegah.png';

class Footer extends Component {
    render () {
        return (
            <footer className="footer-area">       
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">                                             	
                                <ul className="pull-right col-sm-6 hidden-xs">
                                    <div className="clearfix">&nbsp;</div>
                                    <p className="text-right">Copyright &copy; 2019 TELL.</p>
                                </ul>                                      
                                <div className="pull-left col-sm-6 hidden-xs">
                                    <a href="http://trimegah.com/" target="_blank">
                                        <img src={logoTrim} className="text-center" />
                                    </a>
                                </div>                    
                                <div className="col-xs-12 text-center hidden visible-xs">
                                    <img src={logoTrim} className="text-center" />
                                </div>                        
                                <div className="clearfix">&nbsp;</div>                        
                                <p className="col-xs-12 text-center hidden visible-xs">Copyright &copy; 2019 TeLL.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer
