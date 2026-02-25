import { ShowUser } from "./app4.js";
const API = "http://localhost:3001/data";

export async function GetUser() {
    try {
        const response = await axios.get(API);
        ShowUser(response.data);
    } catch(e) { 
        console.log(e); 
    }
}
export async function DeleteUser(id) {
    try { await axios.delete(`${API}/${id}`); } 
    catch(e){ console.log(e); }
}

export async function PostUser(obj) {
    try { await axios.post(API, obj); } 
    catch(e){ console.log(e); }
}

export async function EditUserApi(obj, id) {
    try { await axios.put(`${API}/${id}`, obj); } 
    catch(e){ console.log(e); }
}


export function FilterByStatus(status) {
    axios.get(API).then(({data}) => {
        const filtered = status ? data.filter(u => u.status === status) : data;
        ShowUser(filtered);
    });
}

export function FilterByCategory(category) {
    axios.get(API).then(({data}) => {
        const filtered = category ? data.filter(u => u.category === category) : data;
        ShowUser(filtered);
    });
}

const search = document.querySelector(".search");

search.oninput = async () => {
    const value = search.value.trim();

    try {
 const response = await axios.get(value?`${API}?name=${value}`:API);        ShowUser(response.data); 
    } catch (error) {
        console.error(error);
    }
};
GetUser()

