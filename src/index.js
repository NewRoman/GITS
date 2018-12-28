import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from "react-router-dom";

import configureStore from './store';

import App from "./App";

import { userLoggedIn } from "./actions/auth";


import './scss/App.scss'; 
 
const store = configureStore();

// localStorage.removeItem('users');
// localStorage.removeItem('movies');

// create data base in localStorage
if ( !localStorage.getItem('users') ) localStorage.setItem("users", JSON.stringify([]));// all registered user
if ( !localStorage.getItem('movies') ) localStorage.setItem("movies", JSON.stringify([]));// all movies by each user

// if localStorage contains loged user then store this user into redux store 
if ( localStorage.getItem("user") ) {// get logged user from localStorage
  const user = JSON.parse( localStorage.getItem("user") );
  store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

