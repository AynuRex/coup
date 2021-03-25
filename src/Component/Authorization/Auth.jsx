import Footer from "../Footer/Footer";
import React from "react";
import {NavLink} from "react-router-dom";

const AuthPage = (props) => {
    return (
        <div>
            <div className="auth-container">
                <div className="auth-left-col">
                    <NavLink to="/" >COUP</NavLink>
                </div>
                <div className="auth-right-col">
                    <AuthForm authPageText={props.authPageText }/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}


const AuthForm = (props)=>{
    return (
        <div>
            <div className="auth-form-bottom">
                <div className="auth-form-head">
                    {props.authPageText.mainText}
                </div>
                <div>
                    <div>Логин</div>
                    <input/>
                    <div>Пароль</div>
                    <input/>
                    <div className="button-container">
                        <button className="my-button">{props.authPageText.buttonText}</button>
                    </div>


                </div>
            </div>
            <div className="auth-form-bottom">
                <span>{props.authPageText.bottomSpanText}</span>
                <span>{props.authPageText.bottomSpanLinkText}</span>
            </div>
        </div>
    )
}

export default AuthPage;