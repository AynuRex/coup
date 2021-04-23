import {applyMiddleware, combineReducers, createStore} from "redux";
import authReducer from "./auth-reducer";
import groupReducer from "./group-reducer";
import thunk from "redux-thunk";


let reducers = combineReducers({
    auth:authReducer,
    groupPage: groupReducer
})


const store = createStore(reducers,applyMiddleware(thunk))

export default store;