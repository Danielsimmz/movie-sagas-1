import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Link, withRouter, Redirect } from "react-router-dom";
import {Card, Container, CardDeck} from 'react-bootstrap'
import './MovieList.css'

class MovieList extends Component {
  state= {
    redirect: false
  }
  // on component mount dispatch to FETCH_MOVIES
  componentDidMount = () => {
    this.props.dispatch({ type: "FETCH_MOVIES" });

  };
   

  // on click of a movie poster, dispatch to FETCH_DETAILS
  // with the payload being that movie id so we know which row of the inside the database to get.
  getDetails = (id) => {
      this.props.dispatch({ type: "FETCH_DETAILS", payload: id });
      this.setState({redirect: true}) // changing redirect to true
  };

  // when the movie poster is clicked, go to /details
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to = "/details" />
    }
  }

  

  render() {

    return (
        <div className='container justify-content-center'>
        <div className='row justify-content-around'>
        {this.renderRedirect()}
        {/* Mapping through movies, which we recieved from the
            movies reducer as props, to grab each poster and dispay it*/}

        {this.props.movies.map((movie) => {
          return (
            
            
                
          <div className='col col-12 col-md-5 col-xl-3 mx-1 my-2 blackBg rounded'>
              <div className='row justify-content-around'>
          <img src={movie.poster}  onClick={() => this.getDetails(movie.id) }/>
          
          </div>
          </div>
          
         
        
          );
        })}
        
      </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    movies: state.movies,
  };
};

export default connect(mapStateToProps)(MovieList);