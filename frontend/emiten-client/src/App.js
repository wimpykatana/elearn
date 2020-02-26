import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import store from './thedux/store';
import AuthenticatedRoute from './auth'

import axios from 'axios';
import config from './config/config.json';

//set axios credentials deafult to false
axios.defaults.withCredentials = true;

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout/DefaultLayout'),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import('./views/Pages/Login'),
  loading
});

const Home = Loadable({
  loader: () => import('./views/Pages/Home'),
  loading
});

const Register = Loadable({
  loader: () => import('./views/Pages/Register/Register'),
  loading
});

const Page404 = Loadable({
  loader: () => import('./views/Pages/Page404/Page404'),
  loading
});

const Page500 = Loadable({
  loader: () => import('./views/Pages/Page500/Page500'),
  loading
});


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      me: null
    }
  }

  componentWillMount() {
    axios.get(config.api+"/user/me", {})
    .then((response) => {
      this.setState({me: response.data});
    })
    .catch((error) => {
      this.setState({me: error});
    });
  }

  render() {
    if(this.state.me === null) {
      return (
        <div className="animated fadeIn pt-3 text-center">Loading...</div>
      );
    }

    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" name="Login Page" component={Login} />
            <Route exact path="/register" name="Register Page" component={Register} />
            <Route exact path="/404" name="Page 404" component={Page404} />
            <Route exact path="/500" name="Page 500" component={Page500} />
            <AuthenticatedRoute path="/" name="Home" component={Home} data={this.state.me} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}



export default App;