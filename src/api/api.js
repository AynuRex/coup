import * as axios from "axios"
//import * as FormData from 'form-data'
const baseURL = "http://c6f907c06364.ngrok.io/"

const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true
})

export const groupAPI =
    {
        getMainInfo(groupID)  {
            return instance.get(`groups/getMainInfo?id=${groupID}`)
        }
    }

export const authAPI = {
    signUp(login,password){
        //const formData = new FormData();

       // formData.append("login",login);
       // formData.append("password",password);
        return instance.post("auth/signup", {login, password},
            {headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
            }});
    },
    logIn(login,password){
        return instance.post("auth/login",{login,password})
    },
    logout(){
        return instance.delete("auth/login")
    }
}
