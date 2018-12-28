import React from "react";
import PropTypes from "prop-types";
import ErrorMsg from "../messages/ErrorMsg";

class SignupForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: {
        email: "",
		password: "",
		repeat_password: ""
      },
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
	this.onChange = this.onChange.bind(this);
  }
  

  onChange(e) {
	  this.setState({
		  data: { ...this.state.data, [e.target.name]: e.target.value }
		});
	}

  onSubmit(e) {
	e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props
        .submit(this.state.data);
    }
  }

  validate(data) {
    const errors = {};
    if (data.email.indexOf('@') == -1) errors.email = "Invalid email";
	if (!data.password && !data.repeat_password ) errors.blank_password = "Passwords can't be blank";
	if (data.password != data.repeat_password ) errors.unmatch_password = "Passwords don't match";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
		<form onSubmit={ this.onSubmit }>
			
			<div className="form-group text-left">
				<label htmlFor="email">Email address</label>
				<input 
					onChange={this.onChange} 
					type="text" 
					className="form-control" 
					id="email" 
					placeholder="Enter email"
					name="email"
				/>
				{ errors.email && <ErrorMsg text={ errors.email } /> }
			</div>
			<div className="form-group text-left">
				<label htmlFor="first_password">Password</label>
				<input 
					onChange={this.onChange} 
					type="password" 
					className="form-control" 
					id="first_password" 
					placeholder="Password"
					name="password"
				/>
				{ errors.blank_password && <ErrorMsg text={ errors.blank_password } /> }
			</div>
			<div className="form-group text-left">
				<label htmlFor="repeat_password">Password</label>
				<input 
					onChange={this.onChange} 
					type="password" 
					className="form-control" 
					id="repeat_password" 
					placeholder="Repeat Password"
					name="repeat_password"
				/>
				{ errors.blank_password && <ErrorMsg text={ errors.blank_password } /> }
				{ errors.unmatch_password && <ErrorMsg text={ errors.unmatch_password } /> }
			</div>
			
			<button type="submit" className="btn btn-block btn-primary btn-md mt-3">Submit</button>
		</form>
    );
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default SignupForm;
