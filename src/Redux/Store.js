import {combineReducers, createStore} from "redux";
import authReducer from "./auth-reducer";
import groupReducer from "./group-reducer";


let reducers = combineReducers({
    auth:authReducer,
    groupPage: groupReducer
})


const store = createStore(reducers)

export default store;