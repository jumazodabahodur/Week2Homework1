import { ShowData } from "./dom6.js";

const api = "http://localhost:3000/data"

export async function GetData() {
    try {
         const response = await axios.get(api)
console.log(response);

         return response.data
    } catch (error) {
        console.error(error);
        
    }
}


export async function appendData() {

    let data = await GetData()

    ShowData(data)
    
}

export async function CheckData(obj) {
    
try {
    await axios.put(`${api}/${obj.id}`,obj)
} catch (error) {
    console.error(error);
    
}
}

export async function saveImg(image) {
    try {
        const response = await axios.post(api, { avatar: image })
        ShowData(response.data)
        return response.data
    } catch (error) {
        console.error(error)
    }
}