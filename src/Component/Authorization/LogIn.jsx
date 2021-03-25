import React from "react";
import './Authorization.css'
import Auth from "./Auth";



const authPageText={
    mainText : "Войти в систему",
    buttonText: "Войти",
    bottomSpanText: "Ещё нет аккаунта?",
    bottomSpanLinkText: "Зарегестрироваться"
}

const LoginPage=()=>{
    return <Auth authPageText={authPageText}/>
}

export default LoginPage;