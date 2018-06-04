import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import solids from '@fortawesome/fontawesome-free-solid';
import { Image } from 'react-bootstrap';
import { Navbar, Button, Container, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import logo from './img/pickcel.png';
import './App.css';

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
        var NavDp= null;
        var NavLogout=null;
        const store=this.props.store;
        if(store.user.isLoggedIn())
        {
            NavDp=<NavItem><Image src={store.user.dp} alt={store.user.name} responsive/></NavItem>;
            NavLogout=
                     <NavItem>
                     <Button onClick={() =>store.logout()} bsStyle="primary">{(solids)?<FontAwesomeIcon icon={['fas', 'power-off']} size='2x'/>:"Logout"}</Button>
                    </NavItem>
        }
        return (
                <Navbar light color="gray ligthen-2"  expand="md" scrolling>
                <Container>
                    <NavbarBrand href="/">
                        <img src={logo}/> Instagram photo retriever
                    </NavbarBrand>
                    { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
                    <Collapse isOpen = { this.state.collapse } navbar>
                        <NavbarNav left>
                          <NavItem active>
                              <NavLink to="/">Home</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink to="/pictures">Pictures</NavLink>
                          </NavItem>                      
                        </NavbarNav>
                        <NavbarNav right>
                        <NavDp/>
                        <NavLogout/>
                        </NavbarNav>
                    </Collapse>
                    </Container>
                </Navbar>
        );
    }
}

export default NavBarMD;