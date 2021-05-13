import React from "react";
import "./GroupPage.css"

const GroupHome = (props) => {

    return (
        <div className="group-page-home">
            <div className="group-page-home-description">
                <div className="description-content">{props.groupInfo.description}</div>
            </div>
            <div className="group-page-home-user-list">
                {
                    props.groupInfo.userList ? props.groupInfo.userList.map((user) => {
                        return <li>{user.login}</li>
                    }) : null
                }
            </div>
            <div className="group-page-home-content">
                blalbla
            </div>
        </div>)
}

export default GroupHome