import React, {useState} from "react";
import Select from "react-select";
import "./GroupPage.css"
import {
    setDateDelta,
    setMainDisplayFilter, setProgramList,
    setSubDisplayFilter,
    setTableTitle,
    setTableType,
    setTimeScale, setUserList
} from "../../../Redux/group-reducer";
import {connect} from "react-redux";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";


const mainDisplayTypeOptions = [
    {value: "table", label: "Таблица"},
    {value: "diagram", label: "Диаграмма"},
    {value: "graph", label: "График"},]

const tableOptions = [
    {value: "dataByUserProgram", label:"Данные по пользователю/программе"},
    {value: "dataByGroup", label: "Данные по группе"}
]
const dataByUserProgramOptions =[
    {value:"user", label: "По пользователям"},
    {value:"program", label: "По программам"}
]

const dataByGroupOptions =[
    {value:"user", label: "По пользователю"},
    {value:"group", label: "По группе"}
]
const timeScaleOptions = [
    {value: "1 hour", label: "1 час"},
    {value: "2 hour", label: "2 часа"},
    {value: "4 hour", label: "4 часа"},
    {value: "6 hour", label: "6 часов"},
    {value: "12 hour", label: "12 часов"},
    {value: "1 day", label: "1 сутки"},
]




const GetDataFilter = (props) => {

    const mainDisplaySelectorHandler = (obj) => {

        props.setMainDisplayFilter(obj.value)

    }
    const subDisplaySelectorHandler = (obj) => {
        props.setSubDisplayFilter(obj)

    }
    return (
        <div className="getData-filter">
            <div className="display-type-filter">
                <Select options={mainDisplayTypeOptions} isClearble={false} isSearchable={false}
                        value={mainDisplayTypeOptions.find(obj => obj.value === props.currentGroup.getDataFilter.displayType.main)}
                        onChange={mainDisplaySelectorHandler}/>
                {props.currentGroup.getDataFilter.isSubSelectorDisabled ? null :
                    <Select options={props.currentGroup.getDataFilter.subDisplayOptions} isClearble={false} isSearchable={false}
                            value={props.currentGroup.getDataFilter.displayType.sub}
                            isDisabled={props.currentGroup.getDataFilter.isSubSelectorDisabled}
                            onChange={subDisplaySelectorHandler}/>
                }
                <ConcreteFilter {...props}/>
            </div>
        </div>


    )
}

const ConcreteFilter = (props) => {

    const [titleOptions,setTitleOptions] = useState(dataByUserProgramOptions)
    const userOptions = props.currentGroup.userList.map((user)=>({value:user, label:user}))
    const programOptions = props.currentGroup.programList.map((prog)=>({value:prog, label:prog}))
    const onTableTypeChanged = (obj)=>{

        props.setTableType(obj)
        if(obj.value==="dataByUserProgram")
            setTitleOptions(dataByUserProgramOptions)
        else
            setTitleOptions(dataByGroupOptions)
    }


    switch (props.currentGroup.getDataFilter.displayType.sub.value) {
        case "table":
            return (
                <div>
                    <Select options={tableOptions}
                            value={props.currentGroup.getDataFilter.tableFilter.tableType}
                            isClearble={false} isSearchable={false}
                            onChange = {onTableTypeChanged}
                    />
                    <Select options={titleOptions}
                            value={props.currentGroup.getDataFilter.tableFilter.title}
                            isClearble={false} isSearchable={false}
                            onChange = {(obj)=>props.setTableTitle(obj)}
                    />
                    <Select options={timeScaleOptions}
                            value={props.currentGroup.getDataFilter.timeScale}
                            isClearble={false} isSearchable={false}
                            onChange = {(obj)=>props.setTimeScale(obj)}
                    />
                    <Select options={userOptions}
                            value={props.currentGroup.getDataFilter.users}
                            onChange = {(obj)=>props.setUserList(obj)}
                    />
                    <Select options={programOptions}
                            value={props.currentGroup.getDataFilter.programs}
                            onChange = {(obj)=>props.setProgramList(obj)}
                    />
                    <DateRangePicker
                        onChange={props.setDateDelta}
                        value={props.currentGroup.getDataFilter.dateDelta}/>
                </div>)

    }
    return null
}


const mapStateToProps = (state) => {
    return {
        currentGroup: state.groupPage.currentGroup
    }
}
export default connect(mapStateToProps,
    {setMainDisplayFilter, setSubDisplayFilter,
    setTableType,setTableTitle,setTimeScale, setUserList, setProgramList,
        setDateDelta
})(GetDataFilter)
