import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { NavLink } from "react-router-dom";

import contains from "validator/lib/contains";

import SearchMoviesInput from "../forms/SearchMoviesInput";

import { fetchMovies, clearList } from "../../actions/movies";
import { dim } from "ansi-colors";

class DashboardPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      isStartSearch: ''
    }

    this.onInit = this.onInit.bind(this);
    this.clearList = this.clearList.bind(this);
    this.startSearch = this.startSearch.bind(this);
  }

  componentDidMount() {
    this.onInit(this.props);
  } 

  onInit (props) {
    props.fetchMovies( props.userEmail );
  } 
  // search by title movies
  startSearch( valText ) {
    this.setState({isStartSearch: valText.toLowerCase()})
  }

  clearList() {
    this.props.clearList( this.props.userEmail );
  }

  render() {
    let movies = this.props.movies;
    const isStartSearch = this.state.isStartSearch;
    if ( isStartSearch != '' ) {
      movies = movies.filter(( movie ) => {
        return contains(movie.title.toLowerCase(), this.state.isStartSearch)
      })
    }


    return (
      <div className="col">
        

        {movies.length === 0 && isStartSearch == '' ? (
          <div className="no-result-block"> 
            <h3>You haven't any favorite movies!</h3>
          </div>
          ) : <h2 className="mb-3">Your favorite movies list!</h2>} 

          <hr/>
        
        <div className="actions-dashboard row">
          
          <div className="col-6">
            <NavLink className="btn btn-outline-primary btn-sm mt-1 mr-3" to="/dashboard/add"> Add new movie </NavLink>
          
            {
              movies.length > 0 && (
                  <button className="btn btn-outline-primary btn-sm mt-1" onClick={ this.clearList } type="button">Clear list</button>
              )
            }
          </div>

          <div className="col-6">
            <SearchMoviesInput startSearch={ this.startSearch }/>
          </div>
        </div>

        {
          isStartSearch && !movies.length && (
                <div className="no-result-block"> 
                  <h3>There are no result for showing</h3>
                </div>
            )
        }

       

        {
          movies.length > 0 && (
            <table className="table table-sm mt-3">
              <thead>
                
                { 
                  movies.map((movie, key)=> {
                    if ( key == 0 ) {
                      return (
                        <tr key={key}>
                          {
                            Object.keys(movie).map((item, key)=>{
                              return <th scope="col" key={ key }> { item }</th>
                            })
                          }
                        </tr>
                      )
                    }
                  })
                }
              
              </thead>
              <tbody>
                { 
                  movies.map((movie, key)=> {
                    return (
                      <tr key={ key } className="movie-item">
                        {
                          Object.keys(movie).map((item, key)=>{
                            return <td key={ key } className={ key }> { movie[item] ? movie[item] : '-' }</td>
                          })
                        }
                      </tr>
                    )
                  })
                }
        
              </tbody>
            </table>
          )
        }

        {/* <ul className="movies-list">
          { 
            movies.map((movie, key)=> {
              return (
                <li key={ key } className="movie-item">
                  {
                    Object.keys(movie).map((item, key)=>{
                      return <span key={ key } className={ key }> { movie[item] }</span>
                    })
                  }
                </li>
              )
            })
          }
         </ul> */}
      </div>
    );
  }
}

DashboardPage.propTypes = {
  userEmail: PropTypes.string.isRequired,
  fetchMovies: PropTypes.func.isRequired,
  clearList: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    userEmail: state.user.email,
    movies: state.movies
  };
}

export default connect(mapStateToProps, { fetchMovies, clearList })(DashboardPage);
