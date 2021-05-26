import React from "react";
import "./GroupPage.css"
import GetDataFilter from "./GetDataFilter";
import {connect} from "react-redux";
import DataTable from "./DataTable";

const GroupsGetDataPage = (props) => {  
    return (
        <div className="getData-page">
            <GetDataFilter />
            {props.displayedData.dataType==="table"&&props.displayedData.data!==null?
                <DataTable columns={props.displayedData.data.Columns} data={props.displayedData.data.Data}/>:null
            }
        </div>

    )
}
const mapStateToProps = (state)=>{
    return{
        displayedData:state.groupPage.currentGroup.displayedData
    }
}

export default connect(mapStateToProps)(GroupsGetDataPage)
