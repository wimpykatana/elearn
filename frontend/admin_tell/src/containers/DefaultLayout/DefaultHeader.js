import React, { Component } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.png';
import { connect } from 'react-redux';
import { getMe } from './../../thedux/action/meAction';
import { logout } from '../../thedux/action/userAction';
import {getFirstLetter} from '../../utilis/generateInitialName.js';
import socketIOClient from 'socket.io-client';
import config from '../../config/config.json'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props){
    super(props);

    this.onLogout = this.onLogout.bind(this);
  }

  componentWillMount() {
   // this.props.dispatch(getMe());
  }

  onLogout() {
    const token = this.props.me.token;

    this.props.dispatch(logout(token));
  }

  render() {
    if(!this.props.me) {
      return (<div>Need login first</div>)
    }

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, alt: 'CoreUI Logo' }}
        />

        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            {/* <NavLink href="#"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink> */}
          </NavItem>

          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <div className="img-avatar align-middle">
                {getFirstLetter(this.props.me.fullname)}
              </div>
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem onClick={this.onLogout}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
 
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

const mapStateToProps = state => ({
  me: state.me
})

export default connect(mapStateToProps)(DefaultHeader);
