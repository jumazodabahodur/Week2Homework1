import { ShowUser,EditUser } from "./app.js";
const API = "https://6966216af6de16bde44c5161.mockapi.io/students"


async function  GetUser() {
    try {
        const response = await axios.get(API)
        ShowUser(response.data)
    } catch (error) {
        console.log(error);
        
    }
}
GetUser()

async function PostUser(user) {
    try {
        await axios.post(API,user)
        GetUser()
    } catch (error) {
        console.log(error);
        
    }
}
GetUser()




async function DeleteUser(id) {
    try {
        await axios.delete(`${API}/${id}`)
        GetUser()
    } catch (error) {
        console.log(error);
        
    }
}


async function EditUserApi (obj,id) {

try {
    await axios.put(`${API}/${id}`,obj)
    GetUser()
   
} catch (error) {
    console.log(error);
    
}

}


export { PostUser, DeleteUser ,EditUserApi};