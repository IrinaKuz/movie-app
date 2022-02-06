import { Component } from "react";
import HeaderComponent from "./HeaderComponent";
import {
    Routes, 
    Route,
    useParams,
  } from "react-router-dom";
import MovieDetailWithId from "./MovieDetailWithId";
import HomeComponent from "./HomeComponent";
import { API_KEY } from "../shared/api-key";

function GetParams() {
    const params = useParams().movieId;
    console.log(params);
    return(
        <MovieDetailWithId movieId={params}/>
    )
}
class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            searchMovie: '',
            movies: [],
            isLoaded: false,
            error: false,
            fetchMovie: false
        };
        this.getUserInput = this.getUserInput.bind(this);
        this.fetchMovies = this.fetchMovies.bind(this);
    }
    getUserInput(input) {
        this.setState({
            ...this.state,
            searchMovie: input,
            fetchMovie: true
        })
    }
    fetchMovies() {
        console.log(this.state.searchMovie);
        fetch('https://imdb-api.com/en/API/SearchMovie/' + API_KEY + '/' + this.state.searchMovie)
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
            console.log(data);
            this.setState({ 
                movies: data.results,
                isLoaded: true,
                fetchMovie: false
            })
            console.log(this.state);
        })
        .catch(err => console.log(err));
    }
    componentDidMount() {
        this.loadHomePageMovies();
    }
    loadHomePageMovies() {
        fetch('https://imdb-api.com/en/API/MostPopularMovies/' + API_KEY)
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
                console.log(data);
                this.setState({ 
                    movies: data.items,
                    isLoaded: true,
                    fetchMovie: false
                })
                console.log(this.state);
            })
            .catch(err => console.log(err));
        
    }
    render() {
        if(this.state.fetchMovie === true) {
            this.fetchMovies();
        }
            return(
                <div>
                    <HeaderComponent getUserInput={this.getUserInput}/>
                        <Routes>
                            <Route path="/movie/:movieId" element={<GetParams />} />
                            <Route 
                                path="/" 
                                element={<HomeComponent 
                                            searchMovie={this.state.searchMovie} 
                                            movies={this.state.movies}
                                            isLoaded={this.state.isLoaded}
                                            error={this.state.error}
                                        />} 
                            />   
                        </Routes>
                </div>
            )
        } 
}

export default MainComponent;