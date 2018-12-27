import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SignupForm from "../forms/SignupForm";
import { signup } from "../../actions/auth";

class SignupPage extends React.Component {
  constructor(props){
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit (data) {
    this.props.signup(data)
      // .then(() => this.props.history.push("/dashboard"))
      ;
  }

  render() {
    return (
      <div className="row justify-content-md-center">
        <div className="styled-form-block col-sm-6 mt-3 text-center">
          <h3 className="mb-3">Signup</h3>

          <SignupForm submit={this.submit} />

          <div className="mt-3"> 
            Already signup go to <Link to="/login">Login page!</Link>
          </div>
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  // history: PropTypes.shape({
  //   push: PropTypes.func.isRequired
  // }).isRequired,
  signup: PropTypes.func.isRequired
};

export default connect(null, { signup })(SignupPage);
