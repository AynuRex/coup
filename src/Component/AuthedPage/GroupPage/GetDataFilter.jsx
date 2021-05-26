import React, {useState} from "react";
import Select from "react-select";
import "./GroupPage.css"
import {
    getTableFromServer,
    setDateDelta,
    setMainDisplayFilter, setProgramList,
    setSubDisplayFilter,
    setTableTitle,
    setTableType,
    setTimeScale, setUserList
} from "../../../Redux/group-reducer";
import {connect} from "react-redux";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import {groupAPI} from "../../../api/api";


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
    {value: 1, label: "1 час"},
    {value: 2, label: "2 часа"},
    {value: 4, label: "4 часа"},
    {value: 6, label: "6 часов"},
    {value: 12, label: "12 часов"},
    {value: 24, label: "1 сутки"},
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
    const [displayedData,setDisplayedData] = useState(null);
    const userOptions = props.currentGroup.userList.map((user)=>({value:user, label:user.login}))
    const programOptions = props.currentGroup.programList.map((prog)=>({value:prog, label:prog}))
    const onTableTypeChanged = (obj)=>{

        props.setTableType(obj)
        if(obj.value==="dataByUserProgram")
            setTitleOptions(dataByUserProgramOptions)
        else
            setTitleOptions(dataByGroupOptions)
    }



    const onTableRequest = ()=>{

        const sendingFilterData = {
            groupID: props.currentGroup.groupID,
            users:  props.currentGroup.getDataFilter.users,
            dateDelta:  props.currentGroup.getDataFilter.dateDelta.map(date=>date.valueOf()),
            programs:  props.currentGroup.getDataFilter.programs,
            timeScale:  props.currentGroup.getDataFilter.timeScale.value,
            tableFilter:{
                tableType: props.currentGroup.getDataFilter.tableFilter.tableType.value,
                title: props.currentGroup.getDataFilter.tableFilter.title.value
            }
        }
        debugger
        if(sendingFilterData.tableFilter.title==="user")
            sendingFilterData.users=sendingFilterData.users[0]
        else
            sendingFilterData.programs=sendingFilterData.programs[0]
        props.getTableFromServer(sendingFilterData);
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
                            placeholder = "Выбор пользователей"
                    />
                    <Select options={programOptions}
                            value={props.currentGroup.getDataFilter.programs}
                            onChange = {(obj)=>props.setProgramList(obj)}
                            placeholder = "Выбор программ"
                    />
                    <DateRangePicker
                        onChange={props.setDateDelta}
                        value={props.currentGroup.getDataFilter.dateDelta}/>
                    <button onClick={onTableRequest}>
                        Получить данные
                    </button>
                </div>)
        default:
            return null
    }

}


const mapStateToProps = (state) => {
    return {
        currentGroup: state.groupPage.currentGroup,
    }
}
export default connect(mapStateToProps,
    {setMainDisplayFilter, setSubDisplayFilter,
    setTableType,setTableTitle,setTimeScale, setUserList, setProgramList,
        setDateDelta,getTableFromServer
})(GetDataFilter)
