import {combineReducers, createStore} from "redux";
import authReducer from "./auth-reducer";


let reducers = combineReducers({
    auth:authReducer
})


const store = createStore(reducers)

export default store;