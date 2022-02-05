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
        if(error) {
            return <div>Error: {error.message}</div>
        } else if(!isLoaded) {
            return <div>Loading...</div>
        } else {
            console.log(movies)
            return(
                <Container>
                    <MovieSearchResult movies={movies} /> 
                </Container>
            )
        } 
    }
}

export default HomeComponent;