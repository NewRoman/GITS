import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import AddNewMovieForm from "../forms/AddNewMovieForm";
import { addNewMovie } from "../../actions/movies";

class NewMoviePage extends React.Component {
  constructor(props){
    super(props);
	this.submit = this.submit.bind(this);
	
	
  }

  submit (data) {
	data.userEmail = this.props.userEmail;
    this.props.addNewMovie(data)
      .then(() => this.props.history.push("/dashboard"))
      ;
  }

  render() {
    return (
      <div className="row justify-content-md-center">
        <div className="styled-form-block col-sm-6 mt-3 text-center">
          <h3 className="mb-3">Add new movie</h3>

          <AddNewMovieForm submit={this.submit} />

        </div>
      </div>
    );
  }
}

NewMoviePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  userEmail: PropTypes.string.isRequired,
  addNewMovie: PropTypes.func.isRequired
};

function mapStateToProps(state) {
	return {
	  userEmail: state.user.email
	};
  }

export default connect(mapStateToProps, { addNewMovie })(NewMoviePage);
