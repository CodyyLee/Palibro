import React from "react";
import { NavLink } from "react-router-dom";

export default function NavItem(props) {

    return (
        <NavLink to={props.link}>
            {props.name}
        </NavLink>
    )
}