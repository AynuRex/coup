import React from "react";
import './Authorization.css'
import Auth from "./Auth";
import {authAPI} from "../../api/api";



const authPageText={
    mainText : "Регистрация",
    buttonText: "Создать аккаунт",
    bottomSpanText: "Уже есь аккаунт?",
    bottomSpanLinkText: "Войти"
}
const authSubmit=(login, password)=>{
  return authAPI.signUp(login, password)
}

const SignUpPage=()=>{
    return <Auth authPageText={authPageText} authSubmit={authSubmit}/>
}

export default SignUpPage;