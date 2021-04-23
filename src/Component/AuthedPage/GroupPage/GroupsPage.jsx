import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import '../AuthedPage.css'
import {addNewGroup} from "../../../Redux/group-reducer";
import Modal from "./Modal";
import sortDesc from "./../../../images/sort_descending.svg"
import sortAsc from "./../../../images/sort_ascending.svg"
import {compose} from "redux";

const useValidation = (value, validations) => {
    const [isEmpty, setEmpty] = useState(true)
    const [minLength, setMinLengthError] = useState(false)
    const [isFieldUniq, setFieldUniqError] = useState(false);
    const [isFormValid, setFormValid] = useState(false)


    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case "minLength":
                    value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
                    break;
                case "isEmpty":
                    value ? setEmpty(false) : setEmpty(true)
                    break;
                case "UniqFields":
                    validations[validation].includes(value) ? setFieldUniqError(true) : setFieldUniqError(false)
                    break;

            }
        }

    }, [value])


    useEffect(() => {
            if (isEmpty || minLength || isFieldUniq)
                setFormValid(false)
            else
                setFormValid(true)
        },
        [isEmpty, minLength, isFieldUniq])
    return {
        isEmpty,
        minLength,
        isFieldUniq,
        isFormValid
    }
}

const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setDirty] = useState(false);
    const valid = useValidation(value, validations)

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onBlur = (e) => {
        setDirty(true)
    }
    return {
        value,
        onBlur,
        onChange,
        isDirty,
        ...valid,
        setValue,
        setDirty
    }
}


const GroupsPage = (props) => {

    let groupNames = props.groupPage.groups.map((group) => {
        return group.name
    });

    const [redirect, setRedirect]= useState(false)
    const [modalActive, setModalActive] = useState(false);
    const [searchGroup, setSearchGroup] = useState("");
    const [creatorFilter, setCreatorFilter] = useState(true);
    const [adminFilter, setAdminFilter] = useState(true);
    const [memberFilter, setMemberFilter] = useState(true);
    const [sortParameter, setSortParameter] = useState("name");
    const [orderBy, setOrderBy] = useState("desc");
    const [displayedGroups, setDisplayedGroups] = useState(props.groupPage.groups);


    const groupName = useInput('', {isEmpty: true, UniqFields: groupNames, minLength: 5});

    let onAddNewGroup = () => {
        setModalActive(true);
    }


    //when new groups comes from backend
    useEffect(() => {
            filterGroups()
        },
        [props.groupPage.groups, adminFilter, memberFilter, creatorFilter, searchGroup])

    useEffect(() => {
        sortGroups(displayedGroups)
    }, [sortParameter, orderBy])


    const filterGroups = () => {

        const filteredGroup = props.groupPage.groups.filter((group) => {
            return ((group.privilege === 0 && memberFilter) ||
                (group.privilege === 1 && adminFilter) ||
                (group.privilege === 2 && creatorFilter))
                && (searchGroup === "" || group.name.toLowerCase().includes(searchGroup.toLowerCase()))
        })
        sortGroups(filteredGroup)
    }

    const sortGroups = (groups) => {

        const sortOrder = orderBy === "desc" ? -1 : 1;
        const sortFunction = (a, b) => {
            let result = (a[sortParameter] < b[sortParameter]) ? -1 : (a[sortParameter] > b[sortParameter]) ? 1 : 0;
            return result * sortOrder;
        }
        const sortedGroups = [...groups].sort(sortFunction);
        setDisplayedGroups(sortedGroups)
    }

    const onChangeSearchGroup = (e) => {
        setSearchGroup(e.target.value)
    }

    const sortSelectorHandler = (e) => {
        switch (e.target.value) {
            case "По названию":
                setSortParameter("name")
                break;
            case "По количесву участников":
                setSortParameter("userCount")
                break;
            case "По дате создания":
                setSortParameter("creationDate")
                break;

        }
    }
    const onCreateNewGroup = (event) => {

        event.preventDefault();
        if (groupName.isFormValid) {//костыль если нажать enter
            props.addNewGroup(groupName.value);
            groupName.setValue("")
            groupName.setDirty(false);
            setModalActive(false);
        } else//костыль если нажать enter
            setModalActive(true);
        filterGroups()
    }
    const onClickOnGroup = (e) => {

    }


    return (
        <div >
            <div className="group-nav-menu">
                <li className="group-nav-menu-item"> Все группы</li>
                <li className="group-nav-menu-item"> Мои группы</li>
                <button className="group-nav-menu-button" onClick={onAddNewGroup}> Создать новую группу</button>
            </div>
            <div className="filter-container">
                <input placeholder="Поиск группы" value={searchGroup} onChange={onChangeSearchGroup}/>
                <div className="priority-filter-box">
                    <li className={creatorFilter ? "priority-filter active" : "priority-filter"}
                        onClick={() => setCreatorFilter(!creatorFilter)}>Создатель
                    </li>
                    <li className={adminFilter ? "priority-filter active" : "priority-filter"}
                        onClick={() => setAdminFilter(!adminFilter)}>Администратор
                    </li>
                    <li className={memberFilter ? "priority-filter active" : "priority-filter"}
                        onClick={() => setMemberFilter(!memberFilter)}>Участник
                    </li>
                </div>
                <select onChange={sortSelectorHandler}>
                    <option>По названию</option>
                    <option>По дате создания</option>
                    <option>По дате посещения</option>
                    <option>По количесву участников</option>
                </select>
                <img onClick={() => {
                    orderBy === "desc" ? setOrderBy("asc") : setOrderBy("desc")
                }}
                     src={orderBy === "desc" ? sortDesc : sortAsc}
                     style={{margin: "0 5px", borderStyle: "solid", padding: "3px", borderRadius: "3px"}}/>

            </div>
            <div className="list-container">
                {displayedGroups.map((group) =>
                    <Group onClick={onClickOnGroup} groupInfo={group}/>)}
                <Modal active={modalActive} setActive={setModalActive}>
                    <form onSubmit={onCreateNewGroup} className="addNewGroupForm">
                        <h2 style={{textAlign: "center"}}>Создание новой группы</h2>
                        {(groupName.isDirty && groupName.isEmpty) && <div style={{color: "red"}}>Поле пустое</div>}
                        {(groupName.isDirty && groupName.minLength && !groupName.isEmpty) &&
                        <div style={{color: "red"}}>Длина должна быть не менее 5 сим.</div>}
                        {(groupName.isDirty && groupName.isFieldUniq) &&
                        <div style={{color: "red"}}>Группа с таким именем уже существует</div>}
                        <input value={groupName.value} onChange={e => groupName.onChange(e)}
                               onBlur={e => groupName.onBlur(e)}
                               name="groupName" type="text" placeholder="Введите название группы"
                               style={{display: "block", margin: "10px 0", width: "40%"}}/>
                        <button type="button" onClick={() => setModalActive(false)}
                                style={{display: "block", float: "left"}}>Отмена
                        </button>
                        <button type="submit" style={{float: "right",}}>Создать</button>
                    </form>
                </Modal>
            </div>
        </div>
    )
}

const Group = ({groupInfo}) => {
    return (
        <div className="group-form-container">
            <div className="group-form-name"> {groupInfo.name}</div>
            <div className="group-form-highlighted-field">{priorityList[groupInfo.privilege]}</div>
            <div>{userCountToString(groupInfo.userCount)}</div>
            <div>{dateToString(groupInfo.creationDate)}</div>
        </div>
    )
}


let mapStateToProps = (state) => {
    return {
        groupPage: state.groupPage
    }
}
let mapDispatchToProps = {addNewGroup}

const dateToString = (date) => {
    return "Создана: " + date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
}
const userCountToString = (userCount) => {
    if (userCount % 10 < 5 && userCount % 10 > 0 && !(userCount % 100 < 15 && userCount % 100 > 10)) {
        return "В группе: " + userCount + " участникa"
    } else if (userCount % 10 === 1) {
        return "В группе: " + userCount + " участник"
    } else {
        return "В группе: " + userCount + " участников"
    }


}


let priorityList = ["Участник", "Администратор", "Создатель"]
export default compose(connect(mapStateToProps, mapDispatchToProps))
    (GroupsPage);