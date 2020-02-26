
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const mapStateToProps = state => ({
    user: state.user.islogin,
});
  

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
    return(
        <Route {...rest} render={(props) => (
        rest.user
            ? <Component {...props} />
            : <Redirect to='/' />
        )} />
    )
};

export default connect(mapStateToProps)(AuthenticatedRoute);