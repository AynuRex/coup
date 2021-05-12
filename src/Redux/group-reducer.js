import {groupAPI} from "../api/api";
const ADD_NEW_GROUP = "ADD_NEW_GROUP"
const SET_MAIN_DISPLAY_FILTER = "SET_MAIN_DISPLAY_FILTER"
const SET_SUB_DISPLAY_FILTER = "SET_SUB_DISPLAY_FILTER"
const SET_GROUP_MAIN_INFO = "SET_GROUP_MAIN_INFO"
const SET_TABLE_TYPE = "SET_TABLE_TYPE"
const SET_TABLE_TITLE = "SET_TABLE_TITLE"
const SET_TIME_SCALE = "SET_TIME_SCALE"
const SET_USER_LIST = "SET_USER_LIST"
const SET_PROGRAM_LIST = "SET_PROGRAM_LIST"
const SET_DATE_DELTA = "SET_DATE_DELTA"


let initialState = {
    groups: [
        {
            name: "GooseTheFirst",
            privilege: 1,
            userCount: 177013,
            creationDate: new Date()
        },
        {
            name: "GooseTheSecond",
            privilege: 2,
            userCount: 1234,
            creationDate: new Date()
        },
        {
            name: "GooseTheThird",
            privilege: 0,
            userCount: 1243,
            creationDate: new Date()
        },
        {
            name: "GooseTheForth",
            privilege: 1,
            userCount: 324,
            creationDate: new Date()
        },
        {
            name: "GooseTheFive",
            privilege: 2,
            userCount: 123,
            creationDate: new Date()
        }
    ],
    currentGroup: {
        groupID: null,
        groupName: null,
        description: null,
        userList: [],
        programList: [],
        getDataFilter: {
            displayType: {main: "table", sub: {value: "table", label: "Таблица"}},
            isSubSelectorDisabled: true,
            subDisplayOptions: [{value: "table", label: "Таблица"}],
            users: [],//list of checked users
            dateDelta: [new Date(), new Date()],// time interval which data will analyse
            programs: [], //list of analysing programs
            timeScale:  {value: "1 hour", label: "1 час"},//atom value of time
            tableFilter:{
                tableType : {value: "dataByUserProgram", label:"Данные по пользователю/программе"},
                title: {value:"user", label: "По пользователям"}
            }

        }
    },
}
const sendFilter = {
    groupID: 1,
    displayType:"table",
    users: ["sportLoh", "goose"],
    dateDelta: [new Date(), new Date()],
    programs: ["dis","genshin Impact"],
    timeScale: "1 hour",
    tableFilter:{
        tableType:"dataByUserProgram",
        title: "user"
    }
}

const groupReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_NEW_GROUP: {
            return {
                ...state,
                groups: [...state.groups,
                    {
                        name: action.name,
                        privilege: 2,
                        userCount: 1,
                        creationDate: new Date()
                    }]
            }
        }
        case SET_SUB_DISPLAY_FILTER: {
            //subType was Changed
            return {
                ...state,
                currentGroup: {
                    ...state.currentGroup,
                    getDataFilter: {
                        ...state.currentGroup.getDataFilter,
                        displayType: {
                            ...state.currentGroup.getDataFilter.displayType,
                            sub: action.subType
                        }
                    }
                }

            }
        }
        case SET_MAIN_DISPLAY_FILTER: {
            const newIsSubSelectorDisabled = displayFilterOptions[action.mainType].length === 1
            return {
                ...state,
                currentGroup: {
                    ...state.currentGroup,
                    getDataFilter: {
                        ...state.currentGroup.getDataFilter,
                        displayType: {
                            main: action.mainType,
                            sub: displayFilterOptions[action.mainType][0]
                        },
                        subDisplayOptions: displayFilterOptions[action.mainType],
                        isSubSelectorDisabled: newIsSubSelectorDisabled
                    }
                }

            }

        }
        case SET_GROUP_MAIN_INFO:{
            return{
                ...state,
                currentGroup: {
                    ...state.currentGroup,
                    groupID: action.groupData.groupID,
                    groupName: action.groupData.groupName,
                    description: action.groupData.description,
                    userList: [...action.groupData.userList],
                    programList: [...action.groupData.programList],
                }
            }
        }
        case SET_TABLE_TYPE:{
            return {
                ...state,
                currentGroup: {
                    ...state.currentGroup,
                    getDataFilter: {
                        ...state.currentGroup.getDataFilter,
                        tableFilter: {
                            tableType: action.tableType,
                            title: {value:"user", label: "По пользователям"}
                        }
                    }

                }
            }
        }
        case SET_TABLE_TITLE:{
            return {
                ...state,
                currentGroup: {
                    ...state.currentGroup,
                    getDataFilter: {
                        ...state.currentGroup.getDataFilter,
                        tableFilter: {
                            ...state.currentGroup.getDataFilter.tableFilter,
                            title: action.title
                        }
                    }

                }
            }
        }
        case SET_TIME_SCALE:
            return {
                ...state,
                currentGroup: {
                    ...state.currentGroup,
                    getDataFilter: {
                        ...state.currentGroup.getDataFilter,
                        timeScale: action.timeScale
                    }
                }
            }
        case SET_USER_LIST:{
            return {
                ...state,
                currentGroup: {
                    ...state.currentGroup,
                    getDataFilter: {
                        ...state.currentGroup.getDataFilter,
                        users: action.userList
                    }
                }
            }
        }
        case SET_PROGRAM_LIST:{
            return {
                ...state,
                currentGroup: {
                    ...state.currentGroup,
                    getDataFilter: {
                        ...state.currentGroup.getDataFilter,
                        programs: action.programList
                    }
                }
            }
        }
        case SET_DATE_DELTA:{
            return {
                ...state,
                currentGroup: {
                    ...state.currentGroup,
                    getDataFilter: {
                        ...state.currentGroup.getDataFilter,
                        dateDelta: action.dateDelta
                    }
                }
            }
        }
        default:
            return state;
    }
}

const displayFilterOptions = {
    table: [{value: "table", label: "Таблица"}],
    diagram: [{value: "bar", label: "Стобчатая"}, {value: "circle", label: "Круговая"}],
    graph: [{value: "linear", label: "Линейная"}]
}

const setGroupMainInfo = (groupData)=>({type:SET_GROUP_MAIN_INFO,groupData})

export const addNewGroup = (name) => ({type: ADD_NEW_GROUP, name})
export const setMainDisplayFilter = (mainType) => ({type: SET_MAIN_DISPLAY_FILTER, mainType})
export const setSubDisplayFilter = (subType) => ({type: SET_SUB_DISPLAY_FILTER, subType})
export const setTableType  =(tableType)=>({type:SET_TABLE_TYPE, tableType})
export const setTableTitle  =(title)=>({type:SET_TABLE_TITLE, title})
export const setTimeScale = (timeScale) =>({type:SET_TIME_SCALE, timeScale})
export const setUserList = (userList) =>({type: SET_USER_LIST, userList})
export const setProgramList = (programList) =>({type: SET_PROGRAM_LIST, programList})
export const setDateDelta = (dateDelta)=>({type:SET_DATE_DELTA, dateDelta})

export const getMainInfo = (groupID) => async (dispatch) => {

     groupAPI.getMainInfo(groupID).then((response)=>{

        dispatch(setGroupMainInfo(response.data));
    })


}

export default groupReducer;