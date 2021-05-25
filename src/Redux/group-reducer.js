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
const SET_GROUP_LIST = "SET_GROUP_LIST"
const SET_DISPLAYED_DATA = "SET_DISPLAYED_DATA"
const SET_GROUP_ID = "SET_GROUP_ID"


let initialState = {
    groups: [],
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
            timeScale: {value: 1, label: "1 час"},//atom value of time
            tableFilter: {
                tableType: {value: "dataByUserProgram", label: "Данные по пользователю/программе"},
                title: {value: "user", label: "По пользователям"}
            }
        },
        displayedData: {
            dataType: null,
            data: null
        }

    },
}
const sendFilter = {
    groupID: 1,
    users: ["sportLoh", "goose"],
    dateDelta: [new Date(), new Date()],
    programs: ["dis", "genshin Impact"],
    timeScale: 1,
    tableFilter: {
        tableType: "dataByUserProgram",
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
        case SET_GROUP_MAIN_INFO: {
            return {
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
        case SET_TABLE_TYPE: {
            return {
                ...state,
                currentGroup: {
                    ...state.currentGroup,
                    getDataFilter: {
                        ...state.currentGroup.getDataFilter,
                        tableFilter: {
                            tableType: action.tableType,
                            title: {value: "user", label: "По пользователям"}
                        }
                    }

                }
            }
        }
        case SET_TABLE_TITLE: {
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
        case SET_USER_LIST: {
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
        case SET_PROGRAM_LIST: {
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
        case SET_DATE_DELTA: {
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
        case SET_GROUP_LIST:
            return {
                ...state,
                groups: [...action.groups]
            }
        case SET_DISPLAYED_DATA:
            return {
                ...state,
                currentGroup: {
                    ...state.currentGroup,
                    displayedData: {
                        dataType: action.dataType,
                        data: action.data,
                    }
                }
            }
        case SET_GROUP_ID:
            return {
                ...state,
                currentGroup: {
                    groupID: action.id,
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
                        timeScale: {value: 1, label: "1 час"},//atom value of time
                        tableFilter: {
                            tableType: {value: "dataByUserProgram", label: "Данные по пользователю/программе"},
                            title: {value: "user", label: "По пользователям"}
                        }
                    },
                    displayedData: {
                        dataType: null,
                        data: null
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

const setGroupMainInfo = (groupData) => ({type: SET_GROUP_MAIN_INFO, groupData})
const setGroupList = (groups) => ({type: SET_USER_LIST, groups})
export const addNewGroup = (name) => ({type: ADD_NEW_GROUP, name})
export const setMainDisplayFilter = (mainType) => ({type: SET_MAIN_DISPLAY_FILTER, mainType})
export const setSubDisplayFilter = (subType) => ({type: SET_SUB_DISPLAY_FILTER, subType})
export const setTableType = (tableType) => ({type: SET_TABLE_TYPE, tableType})
export const setTableTitle = (title) => ({type: SET_TABLE_TITLE, title})
export const setTimeScale = (timeScale) => ({type: SET_TIME_SCALE, timeScale})
export const setUserList = (userList) => ({type: SET_USER_LIST, userList})
export const setProgramList = (programList) => ({type: SET_PROGRAM_LIST, programList})
export const setDateDelta = (dateDelta) => ({type: SET_DATE_DELTA, dateDelta})
export const setDisplayedData = (data, dataType) => ({type: SET_DISPLAYED_DATA, data, dataType})
export const setGroupId = (id)=>({type:SET_GROUP_ID,id})

export const getMainInfo = (groupID) => async (dispatch) => {

    groupAPI.getMainInfo(groupID).then((response) => {

        dispatch(setGroupMainInfo(response.data));
    })
}
export const getGroups = () => async (dispatch) => {
    groupAPI.getGroups().then(response => {
        const GroupList = response.data.map(e=>({...e,
                        creationDate:new Date(e.creationDate)}
        ))
        dispatch(setGroupList(GroupList))
    })
}

export const getTableFromServer = (filter) => async (dispatch) => {
    groupAPI.getTable(filter).then(response => {
        dispatch(setDisplayedData(response.data, "table"))
            .catch(() => dispatch(setDisplayedData(null, null)))
    })
}

export default groupReducer;