import React from "react";

import LoginPage from "./Component/Authorization/LogIn";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import SignUpPage from "./Component/Authorization/SignUp";
import StartPage from "./Component/MainPage/StartPage";

import {connect} from "react-redux";
import AuthedPage from "./Component/AuthedPage/AuthedPage";
import Goose from './images/goose.jpg'


function App(props) {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/signup" component={SignUpPage}/>
                    <Route path = "/startPage" component = {StartPage}/>

                    {props.auth.isAuth?
                        <Redirect exact from  ="/" to = "/home"/>
                        : <Redirect exact from  ="/" to = "/startPage"/>
                    }
                    {paths.includes(window.location.pathname)? <Route component={AuthedPage}/>:
                        <div>
                            <h1> ERROR 404. PAGE NOT FOUND  </h1>
                            <img src={Goose}/>
                        </div>



                    }

                </Switch>
            </div>
        </BrowserRouter>
    );
}

const paths= ["/home", "/groups", "/forms", "/settings"];

let mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(App);
