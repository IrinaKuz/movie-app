import { Component } from "react";
import MovieSearchResult from "./MovieSearchResults";
import { Container } from 'reactstrap';

class HomeComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const error = this.props.error;
        const isLoaded = this.props.isLoaded;
        const movies = this.props.movies;
        const searchMovie = this.props.searchMovie;
        if(!isLoaded) {
            return (
                <div>Loading...</div>
            )            
        } else if (error) {
                <div>{error}</div>
        } else {
            return(
                <Container>
                    <h1>{searchMovie == '' ? "Top 100 Most Polular Movies" : "Search Results"}</h1>
                    <MovieSearchResult movies={movies} />
                </Container>
            )
        }
    } 
}

export default HomeComponent;