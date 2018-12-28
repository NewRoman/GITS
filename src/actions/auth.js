
import constants from '../constants/constants'
import api from "../api";

export const userLoggedIn = user => ({
  type: constants.USER_LOGGED_IN,
  user
});

export const userLoggedOut = () => ({
  type: constants.USER_LOGGED_OUT
});

export const login = credentials => dispatch =>
  api.user.login(credentials).then(user => {

    localStorage.setItem('user', JSON.stringify(user));
    dispatch(userLoggedIn(user));
  });

export const logout = () => dispatch => {
  localStorage.removeItem('user');
  dispatch(userLoggedOut());
};

export const signup = data => dispatch =>
  api.user.signup(data).then(user => {
    localStorage.setItem('user', JSON.stringify(user));
    dispatch(userLoggedIn(user));
  });
