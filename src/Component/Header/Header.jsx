import React from "react";
import './Header.css'
import {Link, NavLink} from "react-router-dom";
import {authAPI} from "../../api/api";
import {connect} from "react-redux";
import {logoutAC} from "../../Redux/auth-reducer";

const Header = (props) => {
    return (
        <div className="header">
            <Link className="header-link" to="/">COUP</Link>
            <ConnectedHeaderMenu {...props} />
        </div>
    )
}


const HeaderMenu = (props) => {

    const logout = () => {
        authAPI.logout().then(() => props.logoutAC())

    }
    return (
        <ul className="right-float">
            <a className="header-link">Начало работы</a>
            <a className="header-link">Скачать</a>
            {props.auth.isAuth?
                <button onClick={logout}>выход</button>:
                <>
                <NavLink className="log-in" to="/login">Войти</NavLink>
                <NavLink className="sign-in" to="/signup">Зарегестрироваться </NavLink>
                </>
            }



        </ul>
    )
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
const ConnectedHeaderMenu = connect(mapStateToProps, {logoutAC})(HeaderMenu);
export default Header;