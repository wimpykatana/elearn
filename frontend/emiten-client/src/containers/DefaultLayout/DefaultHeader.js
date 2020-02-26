import React, { Component } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../images/logo-TeLL.png';
import { connect } from 'react-redux';
import {getMe} from '../../thedux/action/meAction';


const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getMe());
  }

  render() {
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
                WK
              </div>
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
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
