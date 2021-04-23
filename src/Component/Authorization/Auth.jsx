import Footer from "../Footer/Footer";
import React, {useEffect, useState} from "react";
import {NavLink, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {loginAC} from "../../Redux/auth-reducer";





const AuthPage = (props) => {
    return (
        <div>
            <div className="auth-container">
                <div className="auth-left-col">
                    <NavLink to="/" >COUP</NavLink>
                </div>
                <div className="auth-right-col">
                    <ConnectedAuthForm {...props} />
                </div>
            </div>
            <Footer/>
        </div>
    )
}


const AuthForm = (props)=>{
    const [login,setLogin]= useState("");
    const [password,setPassword]= useState("")

    const [redirect, setRedirect]= useState(false)
    //set redirect to false when authPage opens
    useEffect(()=>{
        setRedirect(false)
    },[])

    const onPasswordChange=(e)=>{
        setPassword(e.target.value)
    }
    const onLoginChange=(e)=>{
        setLogin(e.target.value)
    }

    const onAuthSubmit = ()=>{
       props.authSubmit(login,password).then
       (response=>{console.log(response)
           props.loginAC();
           setRedirect(true)
       }
       )
           .catch(error=>alert(error))

    }

    if(redirect)
    {
        return <Redirect to='home'/>
    }

    return (
        <div>
            <div className="auth-form-bottom">
                <div className="auth-form-head">
                    {props.authPageText.mainText}
                </div>
                <div>
                    <div>Логин</div>
                    <input value={login} onChange={onLoginChange} />
                    <div>Пароль</div>
                    <input value={password} type="password" onChange={onPasswordChange}/>
                    <div className="button-container">
                        <button className="my-button" onClick={onAuthSubmit}>{props.authPageText.buttonText}
                        </button>
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
const ConnectedAuthForm =connect(null, {loginAC})(AuthForm)


export default AuthPage;