import { CheckData , GetData,saveImg } from "./api6.js"

const statusFilter = document.querySelector(".statusFilter")
const search = document.querySelector(".search")
const box = document.querySelector(".box")
 const FileImage = document.querySelector(".FileImage")
 const Avatar = document.querySelector(".Avatar")

 FileImage.onchange = (event) =>{
    let file = event.target.files[0]
    let reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = (result) =>{
        Avatar.src = result.target.result
        saveImg(Avatar.src)
    }
 }




export function ShowData(data){
    box.innerHTML = ""

    data.forEach((e,i)=>{
        const tr = document.querySelector("tr")

        tr.innerHTML =`
        <td>${e.id}</td>
          <td>${e.name}</td>
           <td>${e.email}</td>
            <td>${e.status ? "Online" : "Offline"}</td>

            <td>
            <button>Edit</button>
               <button>Delete</button>
               <input class = "check" type ="checkbox"/>
            </td>
        `

        let check = tr.querySelector(".ckeck")

        check.check = e.status
        check.onclick = ()=>{
            let checkedData = {...e,status: !e.status}

            CheckData (checkedData)
        }

        box.append(tr)
    })
}

statusFilter.onchange = async (event) => {
    const value = event.target.value;           // string аз select
    const data = await GetData();               // гирифтани ҳамаи data аз сервер

    // filter бо тернарӣ
    const filterData = value === "" 
        ? data 
        : data.filter(e => e.status === (value === "true"));

    // Намоиш додани рӯйхат
    ShowData(filterData);
}



search.oninput = async (event) =>{
    let value = event.target.value
    let data = await GetData()
    let filterData = value 
    ? data.filter((e) => e.name.toLowerCase().includes(value)):data
ShowData(filterData)

}