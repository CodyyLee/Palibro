import React from "react";
import styled from "styled-components";

import NavItem from "./NavItem";

const Nav = styled.nav`
    width: 100%;
    height: 10vh;
    background-color: rgba(50, 105, 151, 0.2);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 0;
`

const Div = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`

export default function Navigation() {

    return (
        <Nav>
            <Div>
                <NavItem link="/" name="Home"/>
                <NavItem link="/search" name="Player Search"/>
            </Div>

            <Div>
                <NavItem link="/login" name="Login"/>
                <NavItem link="/signup" name="Sign Up"/>
            </Div>
        </Nav>
    )
}