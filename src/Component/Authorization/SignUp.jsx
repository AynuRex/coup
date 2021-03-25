import React from "react";
import './Authorization.css'
import Auth from "./Auth";



const authPageText={
    mainText : "Регистрация",
    buttonText: "Создать аккаунт",
    bottomSpanText: "Уже есь аккаунт?",
    bottomSpanLinkText: "Войти"
}

const SignUpPage=()=>{
    return <Auth authPageText={authPageText}/>
}

export default SignUpPage;