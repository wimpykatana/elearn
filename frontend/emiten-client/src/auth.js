import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';
import config from './config/config.json';

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  
  if(rest.error) {
    return (<Redirect to='/login' />)
  }

  return(
    <Route {...rest} render={(props) => (
      rest.data && rest.data.user
        ? <Component {...props} data={props} />
        : <Redirect to='/login' />
    )} />
  )
};

export default  AuthenticatedRoute;