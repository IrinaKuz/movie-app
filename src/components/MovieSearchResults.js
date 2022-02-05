import { Component } from "react";
import MovieDetail from "./MovieDetail";
import { Row } from 'reactstrap';

class MovieSearchResults extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const movies = this.props.movies;
        if(movies == null) {
            return (
                <div>No search results</div>
            )
        } else {
            const listMovies = movies.map(el => {
                return <MovieDetail key={el.id} movie={el} />
            })
            return (
                <Row>
                    {listMovies}
                </Row>
            )
        }
    }
        
}

export default MovieSearchResults;