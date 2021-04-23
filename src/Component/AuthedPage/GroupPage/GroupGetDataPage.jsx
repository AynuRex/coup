import React, {useState} from "react";
import Select from "react-select";
import "./GroupPage.css"
import {setMainDisplayFilter, setSubDisplayFilter} from "../../../Redux/group-reducer";
import {connect} from "react-redux";

const mainDisplayTypeOptions = [
    {value: "table", label: "Таблица"},
    {value: "diagram", label: "Диаграмма"},
    {value: "graph", label: "График"},]


const GroupsGetDataPage = (props) => {

    const [isSubDisplayFilterDisabled, setIsSubDisplayFilterDisabled] = useState(false)


    const mainDisplaySelectorHandler = (obj)=>{

        props.setMainDisplayFilter(obj.value)

    }
    const subDisplaySelectorHandler = (obj)=>{
        props.setSubDisplayFilter(obj)

    }

    return (
        <div className="getData-page">
            <div className="getData-filter">
                <div className="display-type-filter">
                    <Select options={mainDisplayTypeOptions} isClearble={false} isSearchable={false} value={mainDisplayTypeOptions.find(obj => obj.value===props.dataFilter.displayType.main)}
                            onChange = {mainDisplaySelectorHandler}/>
                    <Select options={ props.dataFilter.subDisplayOptions} isClearble={false} isSearchable={false}
                            value={props.dataFilter.displayType.sub}
                            isDisabled = {props.dataFilter.isSubSelectorDisabled}
                            onChange = {subDisplaySelectorHandler}
                    />
                </div>
            </div>
        </div>

    )
}
const mapStateToProps = (state)=>{
    return{
        dataFilter : state.groupPage.currentGroup.getDataFilter
    }
}

export default connect(mapStateToProps,{setMainDisplayFilter,setSubDisplayFilter})(GroupsGetDataPage)
