import React from "react";
import PropTypes from "prop-types";

class SearchMoviesInput extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        searchText: ""
    };

    this.onChange = this.onChange.bind(this);
  
  }
  
  onChange(e) {
	this.setState({ searchText: e.target.value }, () => {
		this.props.startSearch( this.state.searchText );
	})
  }

  render() {
    return (
      
		<div className="input-group pull-right input-group-sm">
			<input 
				onChange={ this.onChange } 
				type="text" 
				className="form-control" 
				placeholder="Search by movie's title" 
				name="searchText" />
		</div>

    );
  }
}

SearchMoviesInput.propTypes = {
	startSearch: PropTypes.func.isRequired
};

export default SearchMoviesInput;
