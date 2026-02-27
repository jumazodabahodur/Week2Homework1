import { DeleteUser,PostUser,EditUserApi,FilterByStatus } from "./api4.js";
const box = document.querySelector(".box")

const AddForm = document.querySelector(".AddForm")
const AddModal = document.querySelector(".AddModal")

const EditForm = document.querySelector(".EditForm")
const EditModal = document.querySelector(".EditModal")

const filterByStatus = document.querySelector(".filterByStatus")

const closeBtn = document.querySelector(".close")
const closeEditBtn = document.querySelector(".closeEdit")

const submit = document.querySelector(".submit")
const Add = document.querySelector(".Add")
let idx = null

function ShowUser(data){
    box.innerHTML = "";

    data.forEach((el)=>{
        const tr = document.createElement("tr")
        const tdMember = document.createElement("td")
        const tdFunction = document.createElement("td")
        const tdStatus = document.createElement("td")
        const tdEmployed = document.createElement("td")
        const Action = document.createElement("td")
        const btnDel = document.createElement("button")
        const btnEdit = document.createElement("button")


        tdMember.classList.add("tdMember")

        tdMember.innerHTML = `   <td >
        <img src="${el.avatar}" alt="">
        <div>
            ${el.name} <br>
            ${el.gmail}
        </div>
    </td>`
tdFunction.innerText =el.category
tdStatus.innerHTML = el.status =="true" ? "Onlinee🟢":"Offline⛔"
tdEmployed.innerHTML = el.employed
btnDel.innerHTML = "🗑️"
btnEdit.innerHTML = "✏️"

btnDel.classList.add("btnDel")
btnEdit.classList.add("btnEdit")

btnDel.onclick = () =>{
    DeleteUser(el.id)
}

btnEdit.onclick = () =>{
EditUser(el)
}



filterByStatus?.addEventListener("change", ()=>FilterByStatus(filterByStatus.value))


tr.append(tdMember,tdFunction,tdStatus,tdEmployed,Action)
Action.append(btnDel,btnEdit)
box.append(tr)


    })
}

Add.onclick = () =>{
    AddModal.show()
}

AddForm.onsubmit = (event) =>{
   
event.preventDefault()

const obj = {
    avatar:AddForm["avatar"].value,
    name:AddForm["name"].value,
    gmail:AddForm["gmail"].value,
     category:AddForm["functio "].value,
    employed:AddForm["employed"].value

}
PostUser(obj)
AddModal.close()
}

function EditUser(el){
    EditModal.show()
    idx = el.id
EditForm["avatar"].value = el.avatar,
EditForm["name"].value = el.name,
EditForm["gmail"].value = el.gmail,
EditForm["function"].value = el.function,
EditForm["employed"].value = el.employed
}


EditForm.onsubmit = (event) =>{
event.preventDefault()

const obj ={
    avatar:EditForm["avatar"].value,
    name:EditForm["name"].value,
    gmail:EditForm["gmail"].value,
       category:EditForm["function"].value,
    employed:EditForm["employed"].value

}
EditUserApi(obj,idx)
EditModal.close()

}

closeBtn.onclick = () =>{
    AddModal.close()
}
closeEditBtn.onclick = () =>{
    EditModal.close()
}





export{ShowUser}