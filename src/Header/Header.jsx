import React from "react";
import './Header.css'

const Header = (props) => {
    return (
        <div className="header">
            <div className=" ">COUPE</div>
            <HeaderMenu/>
        </div>
    )
}

const HeaderMenu= (props)=>{

    return(
        <ul className="right-float">
            <li>Getting started</li>
            <li>Download</li>
            <li className="log-in">LOG IN</li>
            <li className="sign-in">SIGN UP</li>
        </ul>
    )
}

export default Header;