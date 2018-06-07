import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import solids from '@fortawesome/fontawesome-free-solid';
import { Navbar, Button, Container, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem } from 'mdbreact';
import { observer , inject } from "mobx-react";

import logo from 'resources/pickcel.png';

@inject("store")
@observer
class NavBarMD extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
            dropdownOpen: false
        };
    this.onClick = this.onClick.bind(this);
    this.toggle = this.toggle.bind(this);
    }
    

    onClick(){
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        var NavRight = () => <span style={{display:'none'}}>&nbsp;</span>;
        const {store}=this.props;
        if(!store.user.waiting&&store.user.isLoggedIn)
        {
            NavRight = () =>
            <NavbarNav right>
                {/* <NavItem> */}
                    {/* <Image style={{width:'30%',borderRadius:'50%'}} src={store.user.dp} alt={store.user.name} responsive /> */}
                    {/* <h3>Welcome,{store.user.name.split(' ')[0]}</h3> */}
                {/* </NavItem> */}
                <NavItem>
                <div className="nav-link"><h3>Logout</h3></div>

                    {/* <Button onClick={() => store.logout()}  color="primary">
                    {(solids) ? <FontAwesomeIcon icon={['fas', 'power-off']} size='2x' /> : "Logout"}
                    </Button> */}
                </NavItem>
            </NavbarNav>
        }
        return (
            <Navbar color="blue-grey lighten-4" light expand="lg" sticky="top">
                <Container>
                    <NavbarBrand href="/">
                        <img src={logo} alt="logo" /> Instagram photo retriever
                    </NavbarBrand>
                    {!this.state.isWideEnough && <NavbarToggler  onClick={this.onClick} />}
                    <Collapse isOpen={this.state.collapse} navbar>
                        <NavbarNav left>
                            {/* <NavItem active>&nbsp;
                          </NavItem>
                          <NavItem>
                             &nbsp;
                          </NavItem>                       */}
                        </NavbarNav>
                        <NavRight />
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default NavBarMD;