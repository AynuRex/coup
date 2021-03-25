import React from "react";
import './Header.css'
import {Link, NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <div className="header">
            <Link className="header-link" to= "/">COUP</Link>
            <HeaderMenu/>
        </div>
    )
}

const HeaderMenu= (props)=>{

    return(
        <ul className="right-float">
            <a className="header-link">Начало работы</a>
            <a className="header-link">Скачать</a>
            <NavLink className="log-in" to = "/login">Войти</NavLink>
            <NavLink className="sign-in" to = "/signup">Зарегестрироваться</NavLink>
        </ul>
    )
}

export default Header;