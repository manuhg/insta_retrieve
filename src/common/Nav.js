import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import solids from '@fortawesome/fontawesome-free-solid';
import { Navbar, Container, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, Dropdown,DropdownToggle,DropdownMenu,DropdownItem } from 'mdbreact';
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
            dropdownOpen: false,
            changed:false
        };
    this.onClick = this.onClick.bind(this);
    this.toggle = this.toggle.bind(this);
    if(!solids)
        console.log("FA icons not found");
    }
    

    onClick(){
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }
    doneFetching()
    {
        this.setState({changed:!this.state.changed,})
    }
    render() {
        const NavBarRight = ()=>
        {
            const {user,logout}=this.props.store;
            user.doneFetching=this.doneFetching.bind(this);
            if(user.dp)
            {
                return(
                    <NavbarNav right>
                        <NavItem>
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle nav caret>
                                    <img style={{ height: '48px', borderRadius: '50%' }} src={user.dp} alt={user.name} /></DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem href="#">{user.name}</DropdownItem>
                                    <DropdownItem href="#" onClick={() => logout()} color="primary">Logout</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </NavItem>
                    </NavbarNav>
                    );
            }            
            return(
                <NavbarNav right>
                    <NavItem>
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle nav caret> <FontAwesomeIcon style={{borderRadius: '50%' }} icon={['fa', 'user']} size='4x' /> </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href="#">User</DropdownItem>
                                <DropdownItem href="#" onClick={() => logout()} color="primary">
                                   <span> Please log in</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavItem>
                </NavbarNav>
            );
        }
 
        return (
            <Navbar color="black" dark expand="lg">
            <Container>
                    <NavbarBrand href="/">
                        <img src={logo} alt="logo" /> Instagram photo retriever
                    </NavbarBrand>
                    {!this.state.isWideEnough && <NavbarToggler  onClick={this.onClick} />}
                    <Collapse isOpen={this.state.collapse} navbar>
                        <NavbarNav left>
                        </NavbarNav>
                        <NavBarRight />
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default NavBarMD;