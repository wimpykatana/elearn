import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Col, Container, Row} from 'reactstrap';
import { connect } from 'react-redux';
import {logOut} from '../../thedux/action/meAction';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../nav.js';
// routes config
import routes from '../../routes';

import UploadContentVideo from '../../views/Component/uploadContentVideo';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));



class DefaultLayout extends Component {
  constructor(props) {
    super(props)

    this.signOut = this.signOut.bind(this);
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault();

    this.props.dispatch(logOut(this.props.me.data.token));

    window.location.reload();
    //this.props.history.push('/login')
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>

        <div className="app-body">
          <main className="main">
            <div className="animated fadeIn">
                  <Row className="justify-content-center">

                    <UploadContentVideo 
                      editContent={true}
                    />

                    <Col sm="4">&nbsp;</Col>
                  </Row>
              </div>
          </main>
        </div>
        
        <DefaultFooter />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  me: state.me
})

export default connect(mapStateToProps)(DefaultLayout);
