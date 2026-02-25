import { ShowUser } from "./app5.js";
const API = "http://localhost:3000/data";

async function GetUser() {
    try {
        const response = await axios.get(API)
        ShowUser(response.data)
    } catch (error) {
       console.log(error);
        
    }
}
GetUser()

export async function DeleteUser(id) {
    try {
        await axios.delete(`${API}/${id}`)
    } catch (error) {
        console.log(error);
        
    }
}

export async function PostUser(obj) {
    try {
        await axios.post(API,obj)
        GetUser()
    } catch (error) {
        console.log(error);
        
    }
}

export async function EditUserApi(obj,idx) {
        try {
        await axios.put(`${API}/${idx}`,obj)
        GetUser()
    } catch (error) {
        console.log(error);
        
    }
}

const search = document.querySelector(".search")


search.oninput =async ()=>{
 const value = search.value.trim()
           const response = await axios.get(value?`${API}?name=${value}`:API)
           ShowUser(response.data)
    try {
    } catch (error) {
        console.log(error);
        
    }

    
}
GetUser()


export function FilterByStatus(status){
    axios.get(API).then(({data})=>{
        const filtered = status ? data.filter (u=> u.status == status) :data
        ShowUser(filtered)
    })
}


