import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/auth";

const HomePage = ({ isAuthenticated, logout }) => (
  <div className="start-page row justify-content-md-center">
    <div className="styled-form-block col-sm-6 mt-3 text-center">
      {
        isAuthenticated ? <h3 className="mb-3">Here you can go away((</h3> 
        : 
        <h3 className="mb-3">Let's go!!!</h3>
      }
      
      {isAuthenticated ? ( 
        <button className="btn btn-block btn-outline-primary btn-md mt-3" onClick={() => logout()}>Logout</button>
      ) : (
        <div>
          <Link className="btn btn-outline-primary btn-md btn-block " to="/login">Login</Link>
          or 
          <Link className="btn btn-outline-primary btn-md btn-block " to="/signup">Sign Up</Link>
        </div>
      )}
    </div>
  </div>
);

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email
  };
}
// export default connect(mapStateToProps)(HomePage);

export default connect(mapStateToProps, { logout: actions.logout })(HomePage);