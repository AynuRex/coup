import React from "react";
import Footer from "../Footer/Footer";
import './Authorization.css'

const LoginPage = (props) => {
    return (
        <div>
            <div className="auth-container">
                <div className="auth-left-col">
                    COUP
                </div>
                <div className="auth-right-col">
                    <LoginForm/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

const LoginForm = (props)=>{
    return (
        <div>
            <div className="auth-form-bottom">
                <div className="auth-form-head">
                    Войти в систему
                </div>
                <div>
                    <div>ЛОГИН</div>
                    <input/>

                    <div>Пароль</div>
                    <input/>
                    <div className="button-container">
                        <button className="my-button">Зарегестрироваться</button>
                    </div>


                </div>
            </div>
            <div className="auth-form-bottom">
                <span>Уже есть аккаунт?</span>
                <span>Войти</span>
            </div>
        </div>
    )
}

export default LoginPage;