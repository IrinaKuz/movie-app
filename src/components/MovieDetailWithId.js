import { Component } from "react";
import { 
    Col,
    Container,
    Row,
} from 'reactstrap';
import { API_KEY } from '../shared/api-key';

function ActorList(props) {
    const actorList = props.list.map(actor => {
        return(
            <Row key={actor.id}>
                <Col sm="3">
                    <img className="image-actor" src={actor.image} />
                </Col>
                <Col sm="9">
                    {actor.name}
                </Col>
            </Row>
        )    
    });
    return (
        <ul>
            {actorList}
        </ul>
    )
}

class MovieDetailWithId extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {},
            isLoaded: false,
            error: null
        }
    }

    componentDidMount() {
        const movieId = this.props.movieId;

        fetch('https://imdb-api.com/en/API/Title/' + API_KEY + '/' + movieId + '/FullActor,FullCast,Posters,Images,Trailer,Ratings,Wikipedia,')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                this.setState({
                    isLoaded: true,
                    error
                })
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, 
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(data => {
            if(data.errorMessage) {
                this.setState({
                    error: data.errorMessage
                })
            } else {
                console.log(data);
                this.setState({ 
                    movie: data,
                    isLoaded: true
                })
            } 
        })
        .catch(err => console.log(err));
    }

    render() {
        const { error, isLoaded, movie } = this.state;
        console.log(movie);
        if(error) {
            return <div>Error: {error}</div>
        } else if(!isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <Container>
                    <Row>
                        <header>
                            <Col>
                                <h2>{movie.title}</h2>
                                <h3>{movie.tagline ? movie.tagline : ''}</h3>
                                <div className="short-info">
                                    <span>{movie.genre}</span>
                                    <span>{movie.year}</span>
                                    <span>{movie.rated}</span>
                                    <span>{movie.runtime}</span>
                                </div>
                            </Col>
                            <Col>
                                <span>IMDB {movie.imdbRating}</span>
                            </Col>
                            
                        </header>
                    </Row>
                    <Row>
                        <Col>
                            <img
                                className="search-movie-img"
                                alt={movie.title}
                                src={movie.image}
                            />
                        </Col>
                        <Col>
                            {movie.plot}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm='12'>
                            <h3>Cast</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>Director</Col>
                        <Col>{movie.directors}</Col>
                    </Row>
                    <Row>
                        <Col>Writers</Col>
                        <Col>{movie.writers}</Col>
                    </Row>
                    <Row>
                        <Col sm="12"><h3>Actors</h3></Col>
                        <Col sm="12">
                            <ActorList list={movie.actorList.slice(0,10)} />
                        </Col>
                    </Row>
                    <div>
                        
                    </div>
                </Container>
            )
        }
    }
}

export default MovieDetailWithId;