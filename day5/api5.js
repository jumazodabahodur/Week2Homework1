import { showPaginate, ShowUser } from "./app5.js";
const API = "http://localhost:3000/data"

let limit = 10
export async function GetUser(page = 1) {
    try {
        const response = await axios.get(`${API}?_page=${page}&_limit=${limit}`);
      const total = response.headers["x-total-count"]; // total items

        console.log("DATA:", response.data); // check here
        console.log("TOTAL:", total);

        showPaginate(Math.ceil(total / limit));
        ShowUser(response.data);
    } catch (error) {
        console.log(error);
    }
}
GetUser()

export async function DeleteUser(id) {
    try {
        await axios.delete(`${API}/${id}`)
        GetUser()
    } catch (error) {
        console.log(error);
        
    }
}


