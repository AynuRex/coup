import React from "react";
import './Authorization.css'
import Auth from "./Auth";
import {authAPI} from "../../api/api";



const authPageText={
    mainText : "Войти в систему",
    buttonText: "Войти",
    bottomSpanText: "Ещё нет аккаунта?",
    bottomSpanLinkText: "Зарегестрироваться"
}

const authSubmit=(login, password)=>{
  return   authAPI.logIn(login, password)
}
const LoginPage=()=>{
    return <Auth authPageText={authPageText} authSubmit={authSubmit}/>
}

export default LoginPage;