import React, { Component } from 'react';
import 'mobx';
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
            dropdownOpen1: false,
            dropdownOpen2: false,
            changed:false
        };
    this.onClick = this.onClick.bind(this);
    this.toggle1 = this.toggle1.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    if(!solids)
        console.log("FA icons not found");
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
            const {user,logout_,hashVals_concat}=this.props.store;
            if(user.isLoggedIn)
            {
                return(
                    <NavbarNav right>
                    <NavItem>
                        <Dropdown isOpen={this.state.dropdownOpen2} toggle={this.toggle2}>
                            <DropdownToggle nav caret><h4>View Media</h4></DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href="#" onClick={()=>user.getRecentMedia()}><h4>View Recent Media</h4> </DropdownItem>
                                <DropdownItem href="#" onClick={()=>user.getMediaByHashtag(hashVals_concat,this.props.store.getHashTags.bind(this.props.store))}><h4>View Media by Hashtag</h4> </DropdownItem>
                                <DropdownItem href="#" onClick={()=>user.getAllMedia()}><h4>View All Media</h4> </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavItem>
                        <NavItem>
                            <Dropdown style={{float:'right'}}  isOpen={this.state.dropdownOpen1} toggle={this.toggle1}>
                                <DropdownToggle nav caret>
                                    <img style={{ height: '48px', borderRadius: '50%' }} src={this.props.store.user.dp} alt={this.props.store.user.name} /></DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem href="#">{this.props.store.user.name}</DropdownItem>
                                    <DropdownItem href="#" onClick={() => logout_()}>Logout</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </NavItem>
                    </NavbarNav>
                    );
            }            
            return(
                <NavbarNav right>
                    <NavItem>
                        <Dropdown isOpen={this.state.dropdownOpen1} toggle={this.toggle1}>
                            <DropdownToggle nav caret> <FontAwesomeIcon style={{borderRadius: '50%' }} icon={['fa', 'user']} size='4x' /> </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href="#">User</DropdownItem>
                                <DropdownItem href="#">
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