import React from "react";
import './Footer.css'
let Footer = (props)=>{
    return(
       <div className="footer">
           <div className="column-container">
               <div>HERE IS LOGO</div>
               <div>
                   <nav className="my-nav">
                       <li className="my-nav-item-header">Ресурсы</li>
                       <li className="my-nav-item">Github client</li>
                       <li className="my-nav-item">Github desktop admin</li>
                       <li className="my-nav-item">Download</li>
                   </nav>
               </div>
               <div>
                   <nav className="my-nav">
                       <li className="my-nav-item-header">Документация</li>
                       <li className="my-nav-item">Формуляр миэт</li>
                       <li className="my-nav-item">Договор об использовании</li>
                       <li className="my-nav-item">Используемые технологии</li>
                   </nav>
               </div>
               <div>
                   <nav className="my-nav">
                       <li className="my-nav-item-header">Сообщество</li>
                       <li className="my-nav-item">Github разработчиков</li>
                       <li className="my-nav-item">Почта разработчиков</li>
                   </nav>
               </div>
               <div>
                   <nav className="my-nav">
                       <li className="my-nav-item-header">Дополнительно</li>
                       <li className="my-nav-item">О разработке</li>
                   </nav>
               </div>
           </div>

       </div>
    )
}
export default Footer;