import { Component } from "react";
import { 
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown,
    Form,
    Input
} from 'reactstrap';

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        //console.log(this.state.movie)
        return(
            <div>
                <Navbar
                    color="light"
                    expand="md"
                    light
                >
                    <NavbarBrand href="/">
                        Movie DB
                    </NavbarBrand>
                    <NavbarToggler onClick={function noRefCheck(){}} />
                    <Collapse navbar>
                    <Nav className="me-auto" navbar >
                        <Form>
                            <div>
                                <Input
                                    onChange={(evt) => this.props.getUserInput(evt.target.value)}
                                    placeholder='Search movies'
                                />
                            </div>
                        </Form>
                    </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )    
    }
}

export default HeaderComponent;