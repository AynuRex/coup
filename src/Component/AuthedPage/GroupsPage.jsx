import React from "react";
import {connect} from "react-redux";
import './AuthedPage.css'
import addNewGroup from "../../Redux/group-reducer";


const GroupsPage= (props)=>{

    const addNewGroupEvent=()=>{
        debugger;
        props.addNewGroup("GAGA")
    }

    return(
        <div className="list-container">
            <div className="group-form-container" onClick={addNewGroupEvent}>

            </div>
            {props.groupPage.groups.map((group)=>
            <Group groupInfo={group}/>  )}
        </div>
    )
}

const Group = ({groupInfo})=>
{
    return(
        <div className="group-form-container">
            <div className="group-form-name"> {groupInfo.name}</div>
            <div className="group-form-highlighted-field">{priorityList[groupInfo.privilege]}</div>
            <div>{userCountToString(groupInfo.userCount)}</div>
            <div>{dateToString(groupInfo.creationDate)}</div>
        </div>
    )
}


let mapStateToProps=(state)=>{
   return{
       groupPage: state.groupPage
   }
}
let mapDispatchToProps= {
    addNewGroup
}

const dateToString=(date)=>{
    return "Создана: "+ date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear();
}
const userCountToString=(userCount)=>{
    if(userCount%10<5 && userCount%10>0 && !(userCount%100<15 && userCount%100>10)) {
        return "В группе: " + userCount + " участникa"
    }
    else if(userCount%10===1 && userCount%100===111){
        return "В группе: " + userCount + " участник"}
    else{
        return "В группе: " + userCount + " участников"
    }


}



let priorityList= ["Участник", "Администратор", "Создатель"]
export default connect(mapStateToProps, mapDispatchToProps)(GroupsPage);