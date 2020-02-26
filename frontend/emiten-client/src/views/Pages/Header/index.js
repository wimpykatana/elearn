import React, { Component } from 'react';
import { connect } from 'react-redux';
import logoImg from '../../../images/logo-TeLL.png';
import {getMe} from '../../../thedux/action/meAction'
import {logOut} from '../../../thedux/action/meAction'
let logoutMenu;

class Header extends Component {
  constructor(props) {
    super(props);

    this.signOut = this.signOut.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getMe());
  }

  signOut(e) {
    e.preventDefault();

    this.props.dispatch(logOut(this.props.me.data.token));

    window.location.reload();
  }


  render() {
    if(this.props.me.isLogin) {
      logoutMenu =  <li className="pull-right">
                      <button name="singlebutton" onClick={this.signOut} className="btn btn-danger text-uppercase hidden-xs hidden-sm">Logout</button>
                      <button name="singlebutton" onClick={this.signOut} className="btn btn-danger text-uppercase btn-block hidden visible-xs visible-sm" style={{marginTop:-50}}>Logout</button>
                    </li>
    }

    return (
        <div className="mainmenu-area header-trimegah" style={{borderBottom:"1px solid #c1c1c1 !important"}}>      
            <div className="stellarnav" style={{border:'none'}}>
                <a href="#" className="logo hidden visible-xs visible-sm text-center">
                    <img src={logoImg} width="70" alt="logo-trimegah" />                 
                    <p className="hidden visible-xs visible-sm text-center text-capitalize" style={{lineHeight:'normal', letterSpacing:0}}>Structured learning with better experience</p>
                </a>                                               
                <ul>                                        
                    <li>
                        <a href="#" className="logo hidden-xs hidden-sm">
                            <img src={logoImg} className="visible-lg" alt="logo-trimegah" />
                            <div className="text-capitalize" style={{lineHeight:'normal', letterSpacing:0}}>Structured learning with better experience</div>
                        </a>                    
                    </li>
                    
                    {logoutMenu}                                                                 
                </ul>
            </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  me: state.me
})

export default connect(mapStateToProps)(Header);
