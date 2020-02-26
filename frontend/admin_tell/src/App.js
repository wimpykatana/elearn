import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import axios from 'axios';
import store from './thedux/store';
import './App.scss';

axios.defaults.withCredentials = true;

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import('./views/Pages/Login'),
  loading
});

const Page404 = Loadable({
  loader: () => import('./views/Pages/Page404'),
  loading
});

const Page500 = Loadable({
  loader: () => import('./views/Pages/Page500'),
  loading
});

const AuthenticatedRoute = ({ component: Component, ...props,}) => {
  return (
    <Route {...props} render={(routerProps) => (
      (props.me) ? <Component {...routerProps}  {...props} /> : <Login {...routerProps} />
    )} />
  )
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      me: null
    };
  }

  render() {

    //set user status login to redux
    store.dispatch({type: "GET_ME", payload: this.props.me});

    return (
      <Provider store={store}>
        <BrowserRouter basename="/backoffice-tell">
            <Switch>
              <AuthenticatedRoute {...this.props} path="/" name="Home" component={DefaultLayout} />
              <Route exact path="/login" name="Login Page" render={(routerProps) => <Login {...routerProps} {...this.props.me} />} />
              <Route exact path="/404" name="Page 404" component={Page404} />
              <Route exact path="/500" name="Page 500" component={Page500} />
            </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
