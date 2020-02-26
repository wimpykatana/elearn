import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Index from './App';
import config from './config/config.json'
import ReactGA from 'react-ga';
import axios from 'axios';
import store from './__thedux/store';
import { Provider } from "react-redux";
import CryptoJS from 'crypto-js';

import {
  GoogleReCaptchaProvider,
  withGoogleReCaptcha
} from 'react-google-recaptcha-v3';

import * as serviceWorker from './serviceWorker';

localStorage.setItem("trackerId", config.trackerId);

if(!localStorage.getItem('cid2')) {
  ReactGA.ga((tracker) => {
    localStorage.setItem("cid2", tracker.get("clientId"));
  })

}
async function init () {
  const App = withGoogleReCaptcha(Index);

  try {
    var user = await axios.get(config.api+"/user/me");
    let me = user.data.data;

    if(config.env === 'production') {//decrypt data for production only
      var bytes  = CryptoJS.AES.decrypt(me, config.keyEncrypt);
      me = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

    ReactDOM.render(
      <Provider store={store}>
      <GoogleReCaptchaProvider reCaptchaKey={config.reCaptchaKey}>
        <App me={me} />
      </GoogleReCaptchaProvider>
      </Provider>,
      document.getElementById('root')
    );

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: http://bit.ly/CRA-PWA
    serviceWorker.unregister();
  } catch (err) {
    ReactDOM.render(

      <Provider store={store}>
      <GoogleReCaptchaProvider reCaptchaKey={config.reCaptchaKey}>
        <App me={null} />
      </GoogleReCaptchaProvider>
      </Provider>,

      document.getElementById('root')
    );

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: http://bit.ly/CRA-PWA
    serviceWorker.unregister();
  }


}

init();


