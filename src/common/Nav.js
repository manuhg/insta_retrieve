import React, { Component } from 'react';
import 'mobx';
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
            dropdownOpen1: false,
            dropdownOpen2: false,
            changed:false
        };
    this.onClick = this.onClick.bind(this);
    this.toggle1 = this.toggle1.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    }

    onClick(){
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle1() {
        this.setState({
            dropdownOpen1: !this.state.dropdownOpen1,
        });
    }
    toggle2() {
        this.setState({
            dropdownOpen2: !this.state.dropdownOpen2,
        });
    }

    render() {
        const NavBarRight = ()=>
        {
            const {user,logout_,getHashtagsMedia}=this.props.store;
            if(user.isLoggedIn)
            {
                return(
                    <NavbarNav right>
                    <NavItem>
                        <Dropdown isOpen={this.state.dropdownOpen2} toggle={this.toggle2}>
                            <DropdownToggle nav caret><br/>View Media</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href="" onClick={()=>user.getRecentMedia()}>View Recent Media </DropdownItem>
                                <DropdownItem href="" onClick={()=>this.props.store.getHashtagsMedia()}
                                    >View Media by Hashtag </DropdownItem>
                                <DropdownItem href="" onClick={()=>user.getAllMedia()}>View All Media </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavItem>
                        <NavItem>
                            <Dropdown isOpen={this.state.dropdownOpen1} toggle={this.toggle1}>
                                <DropdownToggle nav caret>
                                    <img style={{ height: '48px', borderRadius: '50%' }} src={this.props.store.user.dp} alt={this.props.store.user.name} /></DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem href="">{this.props.store.user.name}</DropdownItem>
                                    <DropdownItem href="" onClick={() => logout_()}>Logout</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </NavItem>
                    </NavbarNav>
                    );
            }            
            return(
                <NavbarNav right>&nbsp;
                    {/* <NavItem>
                        <Dropdown isOpen={this.state.dropdownOpen1} toggle={this.toggle1}>
                            <DropdownToggle nav caret> <FontAwesomeIcon style={{borderRadius: '50%' }} icon={['fa', 'user']} size='4x' /> </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href="">User</DropdownItem>
                                <DropdownItem href="">
                                   <span> Please log in</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavItem> */}
                </NavbarNav>
            );
        }
 
        return (
            <Navbar color="black" dark expand="lg">
            <Container>
                    <NavbarBrand href="/">
                        <img src={logo} alt="logo" /> <h6>Instagram photo retriever</h6>
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