import { PostUser, DeleteUser, EditUserApi } from "./api.js";

const AddModal = document.querySelector(".AddModal")
const EditModal = document.querySelector(".EditModal")
const Add = document.querySelector(".Add")
const EditForm = document.querySelector(".EditForm")
const Form = document.querySelector(".Form")
const box = document.querySelector(".box")
 let idx =null


function ShowUser(data){
box.innerHTML = "";

data.forEach((item)=>{
    const tr = document.createElement("tr")
    const avatar = document.createElement("img")
    const name = document.createElement("td")
    const age = document.createElement("td")
    const Action =  document.createElement("td")
    
    const btnDel = document.createElement("button")
    const btnEdit = document.createElement("button")

    btnDel.classList.add("Del")
    btnEdit.classList.add("Edit")

    btnDel.innerHTML = "🗑️"
    btnEdit.innerHTML = "✏️"

    name.innerHTML = item.name
    avatar.src = item.avatar
age.innerHTML = item.age

btnDel.onclick = ()=>{
    DeleteUser(item.id)
}

btnEdit.onclick = () =>{
    EditUser(item)
}

Action.append(btnDel,btnEdit)
    tr.append(avatar,name,age,Action)
    box.append(tr)
})
}




Form.onsubmit =(event) =>{
    event.preventDefault()

    const user = {
        name:Form["name"].value,
        avatar:Form["avatar"].value,

    }
    PostUser(user)
    AddModal.close()
}

Add.onclick = ()=>{
    AddModal.showModal()
}


EditForm.onsubmit = (event) => {
    event.preventDefault()

    const obj = {
        name: EditForm["name"].value,
        avatar: EditForm["avatar"].value,
        age: EditForm["age"].value,
    }

    EditUserApi(obj,idx)
     EditModal.close()
}

function EditUser(item){
    EditModal.showModal()
    idx = item.id

    EditForm["avatar"].value = item.avatar
    EditForm["name"].value = item.name
    EditForm["age"].value = item.age
}
export{ShowUser,EditUser}