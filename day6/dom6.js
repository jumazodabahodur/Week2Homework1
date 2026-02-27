import { CheckData , GetData } from "./api6.js"

const statusFilter = document.querySelector(".statusFilter")
const search = document.querySelector(".search")
const box = document.querySelector(".box")

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

statusFilter.onchange = async (event) =>{
    let value = event.target.value
    let data = await GetData()
    let filterData = value ? data.filter((e) => e.status.toString() == value):data
ShowData(filterData)

}



search.oninput = async (event) =>{
    let value = event.target.value
    let data = await GetData()
    let filterData = value 
    ? data.filter((e) => e.name.toLowerCase().includes(value)):data
ShowData(filterData)

}