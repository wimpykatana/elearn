import React, { Component } from 'react';
// import './App.css';
import { Provider } from "react-redux";
import axios from 'axios';
import store from './__thedux/store';
// import Signup from './screen/signup';
// import Login from './screen/login';
import Home from './_page/home';
import Detail from './_page/detail';
import Podcast from './_page/podcast';
import Category from './_page/category';
import Profile from './_page/profile';
import Acc from './_page/account';
import Search from './_page/search';
import About from './_page/about';
import ContactUs from './_page/contactUs';
import Termus from './_page/termus';
import Help from './_page/help';
import Forgetpsw from './_page/forgetpsw';
import NotFound from './_page/notfound';
import VerifyEmail from './_page/verifyEmail';
import Redirect from './_page/redirect'
import ReactGA from 'react-ga';

import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

axios.defaults.withCredentials = true;

class App extends Component {
  componentWillMount() {
    if(window.location.pathname === '/') {
      if(this.props.me) {
        window.location.assign("Home-Page");
      }
      else {
        window.location.assign("Landing-Page");
      }
    }
    else {
      ReactGA.pageview(window.location.pathname)
    }
  }

  render() {
    return (

        <BrowserRouter>
          <Switch>
              <Route exact path="/" render={(routeProps)=> (<Redirect {...routeProps} {...this.props} />)} />
              <Route path="/Landing-Page" render={(routeProps)=> (<Home {...routeProps} {...this.props} />)}/>
              <Route path="/Home-Page" render={(routeProps)=> (<Home {...routeProps} {...this.props} />)}/>
              {/* <Route path="/login" component={Login}/>
              <Route path="/signup" component={Signup}/> */}
              <Route path="/search" render={(routeProps) => (<Search {...routeProps} {...this.props} />)} />
              <Route path="/contactus" render={(routeProps) => (<ContactUs {...routeProps} {...this.props} />)}/>
              <Route path="/about" render={(routeProps) => (<About {...routeProps} {...this.props} />)}/>
              <Route path="/help" render={(routeProps) => (<Help {...routeProps} {...this.props} />)}/>
              <Route path="/termus" render={(routeProps) => (<Termus {...routeProps} {...this.props} />)}/>
              <Route path="/verifyemail/:id" render={(routeProps) => (<VerifyEmail {...routeProps} {...this.props} />)}/>
              <Route path="/resetpassword/:token" render={(routeProps) => (<Forgetpsw {...routeProps} {...this.props} />)}/>
              <Route path="/myprofile" render={(routeProps) => (<Profile {...routeProps} {...this.props} />)}/>
              <Route path="/myaccount" render={(routeProps) => (<Acc {...routeProps} {...this.props} />)}/>
              <Route path="/courses/:categoryName/:name" render={(routeProps) => (<Detail {...routeProps} {...this.props} />)} />
              <Route path="/podcast/:categoryName/:name" render={(routeProps) => (<Podcast {...routeProps} {...this.props} />)} />
              <Route path="/category/:name" render={(routeProps) => (<Category {...routeProps} {...this.props}/>)} />
              <Route path="/notfound" component={NotFound} />
              <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>

    )
    // return (
    //   <Provider store={store}>
    //   <BrowserRouter>
    //       <Switch>
    //           <Route exact path="/" render={(routeProps)=> (<Redirect {...routeProps} {...this.props} />)} />
    //           <Route path="/Landing-Page" render={(routeProps)=> (<Home {...routeProps} {...this.props} />)}/>
    //           <Route path="/Home-Page" render={(routeProps)=> (<Home {...routeProps} {...this.props} />)}/>
    //           {/* <Route path="/login" component={Login}/>
    //           <Route path="/signup" component={Signup}/> */}
    //           <Route path="/search" render={(routeProps) => (<Search {...routeProps} {...this.props} />)} />
    //           <Route path="/about" render={(routeProps) => (<About {...routeProps} {...this.props} />)}/>
    //           <Route path="/help" render={(routeProps) => (<Help {...routeProps} {...this.props} />)}/>
    //           <Route path="/termus" render={(routeProps) => (<Termus {...routeProps} {...this.props} />)}/>
    //           <Route path="/verifyemail/:id" render={(routeProps) => (<VerifyEmail {...routeProps} {...this.props} />)}/>
    //           <Route path="/resetpassword/:token" render={(routeProps) => (<Forgetpsw {...routeProps} {...this.props} />)}/>
    //           <Route path="/myprofile" render={(routeProps) => (<Profile {...routeProps} {...this.props} />)}/>
    //           <Route path="/myaccount" render={(routeProps) => (<Acc {...routeProps} {...this.props} />)}/>
    //           <Route path="/courses/:categoryName/:name" render={(routeProps) => (<Detail {...routeProps} {...this.props} />)} />
    //           <Route path="/category/:name" render={(routeProps) => (<Category {...routeProps} {...this.props}/>)} />
    //           <Route path="/notfound" component={NotFound} />
    //           <Route component={NotFound}/>
    //         </Switch>
    //     </BrowserRouter>
    //   </Provider>
    // )

  }
}

export default App;
