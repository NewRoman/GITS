import React from "react";
import PropTypes from "prop-types";
import isInt from "validator/lib/isInt";
import isEmpty from "validator/lib/isEmpty";

import ErrorMsg from "../messages/ErrorMsg";

class AddNewMovieForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: {
        title: "",
        release: "",
        budget: "",
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
    if (!data.title ) errors.title = "Title can't be blank";
    if (!isInt(data.release) && !isEmpty(data.release) ) errors.release = "Required only digits";

    return errors;
  };

  render() {
    const { errors } = this.state;

    return (
      
      <form onSubmit={ this.onSubmit }>
			
        <div className="form-group text-left">
          <label htmlFor="movieTitle">Movie Title</label>
          <input 
            onChange={this.onChange} 
            type="text" 
            className="form-control" 
            id="movieTitle" 
            placeholder="Enter title"
            name="title"
          />
          { errors.title && <ErrorMsg text={ errors.title } /> }
        </div>
        <div className="form-group text-left">
          <label htmlFor="movieRelease">Movie Release</label>
          <input 
            onChange={this.onChange} 
            type="text" 
            className="form-control" 
            id="movieRelease" 
            placeholder="Movie Release"
            name="release"
          />
          { errors.release && <ErrorMsg text={ errors.release } /> }
        </div>

        <div className="form-group text-left">
          <label htmlFor="movieBudget">Movie Budget</label>
          <input 
            onChange={this.onChange} 
            type="text" 
            className="form-control" 
            id="movieBudget" 
            placeholder="Movie Budget"
            name="budget"
          />
          {/* { errors.blank_password && <ErrorMsg text={ errors.blank_password } /> } */}
        </div>
        
        <button type="submit" className="btn btn-block btn-primary btn-md mt-3">Add new movie</button>
      </form>

    );
  }
}

AddNewMovieForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default AddNewMovieForm;
