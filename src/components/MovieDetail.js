import { Component } from "react";
import { 
    Card,
    CardBody,
    CardTitle,
    CardLink,
    CardSubtitle,
    Col
} from 'reactstrap';
import { Link } from 'react-router-dom';

class MovieDetail extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Col md="3">
                    <Card>
                        <CardBody>
                            <CardTitle tag="h3">
                                {this.props.movie.title}
                            </CardTitle>
                            <CardSubtitle>
                                {this.props.movie.description}
                            </CardSubtitle>
                            <img
                                className="search-movie-img"
                                alt={this.props.movie.title}
                                src={this.props.movie.image}
                            />
                            <div>
                                <Link to={"/movie/"+this.props.movie.id}>Open</Link>   
                            </div>
                        </CardBody>               
                    </Card>
                </Col>
        )
    }
}

export default MovieDetail;

