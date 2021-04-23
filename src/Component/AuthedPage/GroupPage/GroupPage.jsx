import React, {useEffect, useState} from "react";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import './GroupPage.css'
import GroupHome from "./GroupHome";
import GroupsGetDataPage from "./GroupGetDataPage";
import {connect} from "react-redux";
import {getMainInfo} from "../../../Redux/group-reducer";

const GroupPage = (props) =>{

    const [displayedMenuContent, setDisplayedMenuContent] = useState("main")
    //get data when page was loaded
    useEffect(()=>{
       props.getMainInfo(props.match.params.groupID)
    },[])

        return<div style={{padding:"10px 30px"}}>

            <div className="group-menu">
                <span className={displayedMenuContent==="main"?"group-menu-item active":"group-menu-item"}
                      onClick=
                          {()=> {
                              setDisplayedMenuContent("main")
                             // props.getMainInfo()
                          }
                      }>Главная</span>
                <span className={displayedMenuContent==="getData"?"group-menu-item active":"group-menu-item"}
                      onClick={()=>setDisplayedMenuContent("getData")}>Отображение данных</span>
                <span  className={displayedMenuContent==="settings"?"group-menu-item active":"group-menu-item"}
                       onClick={()=>setDisplayedMenuContent("settings")}>Настройки группы</span>
            </div>
            <div className="group-name">hello </div>

            <GroupPageContent {...props} displayedMenuContent={displayedMenuContent} />
        </div>
}

const GroupPageContent = (props)=>{
   switch (props.displayedMenuContent){
       case "getData":
           return <GroupsGetDataPage  />
       case "settings":
           return <div>settings</div>
       case "main":
       default:
           return <GroupHome {...props}/>
   }
}
const mapStateToProps=(state)=>{
    return{
        groupInfo:state.groupPage.currentGroup
    }
}


export default compose(connect(mapStateToProps,{getMainInfo}),withRouter)(GroupPage)