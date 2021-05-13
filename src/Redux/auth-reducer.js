const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"

let initialState={
    isAuth:false
}

const authReducer = (state = initialState, action)=>{
    switch (action.type){
        case LOGIN:
            return {
                ...state,
                isAuth: true
            }
            case LOGOUT:
                debugger
            return {
                ...state,
                isAuth: false
            }
        default:
            return state;
    }
}

export const loginAC = ()=>({type:LOGIN})
export const logoutAC = ()=>({type:LOGOUT})
export default authReducer;