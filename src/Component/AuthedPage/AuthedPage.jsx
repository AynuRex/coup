import Header from "../Header/Header";
import {NavLink, Route, Switch} from "react-router-dom";
import Footer from "../Footer/Footer";
import React from "react";
import './AuthedPage.css'
import HomePage from "./HomePage";
import GroupsPage from "./GroupsPage";
import FormsPage from "./FormsPage";
import Settings from "./Settings";



const AuthedPage = (props) => {
    return (
        <div>
            <Header/>
            <div className="authed-page-grid-container">
                <LeftMenu/>
                <div className="left-menu-bottom-void"></div>
                <div className="auth-page-content">
                    <Switch>
                        <Route path="/home" component={HomePage}/>
                        <Route path="/groups" component = {GroupsPage}/>
                        <Route path="/forms" component ={FormsPage}/>
                        <Route path="/settings" component ={Settings}/>
                    </Switch>
                </div>
            </div>

            <Footer/>;
        </div>
    )
}

const LeftMenu = (props)=>{
    return(
        <div className="left-menu">
            <NavLink to = "/home" activeClassName ="selected">
                Главная
            </NavLink>
            <NavLink to = "/groups" activeClassName ="selected">
                Мои группы
            </NavLink>
            <NavLink to = "/forms" activeClassName ="selected">
                Мои формы
            </NavLink>
            <NavLink to = "/settings" activeClassName ="selected">
                Настройки
            </NavLink>
        </div>


    )
}

export default AuthedPage;