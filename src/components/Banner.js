
import React from "react";
import { useNavigate } from "react-router";
import { logout } from "../firebase";
const Banner = (props) => {
    let {title, subtitle, children, showLogout} = props
    const navigate = useNavigate();
    return (
        <div className="banner">
        <h1>{title}</h1>
        <div />
        <p>{subtitle}</p>
        {children}
        {
            showLogout
            ?
            <button class="banner_logout" onClick={() => {logout(); navigate("/");}}>Logout</button>
            :
            null
        }
        </div>
    );
};

export default Banner;