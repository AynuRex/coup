import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import './StartPage.css'

const StartPage = () => {
    return <div>
        <Header/>
        <StartPageContent/>
        <Footer/>
    </div>
}


const StartPageContent = (props) => {
    return (
        <div>
            <div className="content-bg-white">
                THERE ARE SOME CONTENT
            </div>
            <div className="content-bg-blue">
                THERE ARE SOME CONTENT
            </div>
            <div className="content-bg-white">
                THERE ARE SOME CONTENT
            </div>
            <div className="content-bg-blue">
                THERE ARE SOME CONTENT
            </div>
            <div className="content-bg-white">
                THERE ARE SOME CONTENT
            </div>


        </div>
    )
}
export default StartPage;