import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LoginForm from "../forms/LoginForm";
import { login } from "../../actions/auth";

class LoginPage extends React.Component {
  constructor(props){
    super(props);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    document.title = "Log In";
  } 

  submit (data) {
    this.props.login(data)
      ;
  }

  render() {
    return (
      <div className="row justify-content-md-center">
        <div className="styled-form-block col-sm-6 mt-3 text-center">
          <h3 className="mb-3">Login</h3>

          <LoginForm submit={this.submit} />

          <div className="mt-3"> 
            New user? <Link to="/signup">Signup!</Link>
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired
};

export default connect(null, { login })(LoginPage);
