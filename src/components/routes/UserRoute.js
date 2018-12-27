import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { Route, Redirect } from "react-router-dom";


const UserRoute = ({ isAuthenticated, component: Component, ...rest }) => (
	
		<Route
			{...rest}
			render={props => 
					isAuthenticated ? (
						<Component {...props}/>
					) : (
						<Redirect to="/" />
					)
			}/>
	
)


UserRoute.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	component: PropTypes.func.isRequired,
}


function mapStateToProps(state) {
	return {
	  isAuthenticated: !!state.user.email
	};
  }
  
  export default connect(mapStateToProps)(UserRoute);