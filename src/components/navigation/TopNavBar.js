import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from './../../actions/auth';
  
const TopNabBar = ({ location, logout, user }) => (
  <section className="col mt-3">
		{
			location.pathname != '/' && (<span><NavLink to="/">Go Home</NavLink></span>)
		}
	
		<span className="col-sm-3">
				{ user.email }
		</span>

		{
			location.pathname != '/' && (<span className="col-sm-3 text-center"><button className="btn btn-outline-primary btn-sm mt-1" onClick={ logout }>LogOut</button></span>)
		}
		
		{
			location.pathname != '/dashboard' && (<span className="col-sm-3"><NavLink to="/dashboard">Show movies list</NavLink></span>)
		}
	
		<hr/>
  </section>
);

TopNabBar.propTypes = {
	logout: PropTypes.func.isRequired,
	user: PropTypes.shape({
		email: PropTypes.string.isRequired
	  }).isRequired,
};

function mapStateToProps(state) {
  return {
	user: state.user
  };
}

export default connect(mapStateToProps, { logout })(TopNabBar);
