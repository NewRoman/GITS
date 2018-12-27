import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import DashboardPage from "./components/pages/DashboardPage";
import SignupPage from "./components/pages/SignupPage";
import NewMoviePage from "./components/pages/NewMoviePage";
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";
import TopNavBar from "./components/navigation/TopNavBar";
  
const App = ({ location, isAuthenticated }) => (
  <div className="container">
    
    {isAuthenticated && <TopNavBar location={location}/>}
    <Route location={location} path="/" exact component={HomePage} />
    
    <GuestRoute location={location} path="/login" exact component={LoginPage} />

    <GuestRoute location={location} path="/signup" exact component={SignupPage} />
   
    <UserRoute
      location={location}
      path="/dashboard"
      exact
      component={DashboardPage}
    />
    <UserRoute
      location={location}
      path="/dashboard/add"
      exact
      component={NewMoviePage}
    />
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated:!!state.user.email
  };
}

export default connect(mapStateToProps)(App);
