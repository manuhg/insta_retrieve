import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import solids from '@fortawesome/fontawesome-free-solid';
import { Image } from 'react-bootstrap';
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
        const {data}=this.props.store;
        if(data.user.isLoggedIn)
        {
            NavRight =
            <NavbarNav right>
                <NavItem>
                    <Image src={data.user.dp} alt={data.user.name} responsive />
                </NavItem>
                <NavItem>
                    <Button onClick={() => data.logout()} bsStyle="primary">{(solids) ? <FontAwesomeIcon icon={['fas', 'power-off']} size='2x' /> : "Logout"}</Button>
                </NavItem>
            </NavbarNav>
        }
        return (
                <Navbar light color="gray ligthen-2"  expand="md" scrolling>
                <Container>
                    <NavbarBrand href="/">
                        <img src={logo} alt="logo"/> Instagram photo retriever
                    </NavbarBrand>
                    { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
                    <Collapse isOpen = { this.state.collapse } navbar>
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