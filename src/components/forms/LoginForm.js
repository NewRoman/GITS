import React from "react";
import PropTypes from "prop-types";
import ErrorMsg from "../messages/ErrorMsg";


class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: {
        email: "",
        password: ""
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
    //   this.setState({ loading: true });
      this.props
        .submit(this.state.data);
    }
  }

  validate(data) {
    const errors = {};
    if (data.email.indexOf('@') == -1) errors.email = "Invalid email";
    if (!data.password && !data.repeat_password ) errors.blank_password = "Passwords can't be blank";
    return errors;
  };

  render() {
    const { data, errors } = this.state;

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
        <div className="form-group  text-left">
          <label htmlFor="password">Password</label>
          <input 
            onChange={this.onChange} 
            type="password" 
            className="form-control" 
            id="password" 
            placeholder="Password"
            name="password"
          />
          { errors.blank_password && <ErrorMsg text={ errors.blank_password } /> }
        </div>
        
        <button type="submit" className="btn btn-block btn-primary btn-md mt-3">Login</button>
      </form>

    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default LoginForm;
