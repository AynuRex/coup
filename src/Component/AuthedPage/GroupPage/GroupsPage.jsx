import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import '../AuthedPage.css'
import {addNewGroup} from "../../../Redux/group-reducer";
import Modal from "./Modal";

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

    let groupNames = [];
    props.groupPage.groups.map((group) => {
            groupNames.push(group.name)
        }
    )

    const [modalActive, setModalActive] = useState(false);
    const groupName = useInput('', {isEmpty: true, UniqFields: groupNames, minLength: 5});

    let onAddNewGroup = () => {
        setModalActive(true);
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
    }


    return (
<div>
      <div className="filter-conatiner">
          <div></div>
         </div>
        <div className="list-container">

            <div className="group-form-container" onClick={onAddNewGroup}>
            </div>
            {props.groupPage.groups.map((group) =>
                <Group groupInfo={group}/>)}
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
                    <button type="button" onClick={() => setModalActive(false)} style={{display: "block", float: "left"}}>Отмена
                    </button>
                    <button type="submit" style={{float: "right", }}>Создать</button>
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
export default connect(mapStateToProps, mapDispatchToProps)(GroupsPage);