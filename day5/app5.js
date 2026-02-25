import { DeleteUser } from "./api5.js";

const box = document.querySelector('.box');
const Add = document.querySelector(".Add")



function ShowUser(data){
    box.innerHTML = ""

  data.forEach((el)=>{
        const tr = document.createElement("tr")
        const id = document.createElement("td")
        const avatar = document.createElement("img")
        const name = document.createElement("td")
        const age = document.createElement("td")
        const status = document.createElement("td")
        const category = document.createElement("td")
        const action  = document.createElement("td")

        const btnDel = document.createElement("button")
        const btnEdit = document.createElement("button")

        btnDel.innerHTML = "Del"
        btnEdit.innerHTML = "Edit"

id.innerHTML = el.id
avatar.src = el.avatar
name.innerHTML = el.name
age.innerHTML = el.age
        status.innerText = el.status === "true" ? "🟢 Active" : "🔴 Inactive";
category.innerHTML = el.category

btnDel.onclick = () =>{
    DeleteUser(el.id)
}

tr.append(id,avatar,name,age,status,category,action)
action.append(btnDel,btnEdit)
box.append(tr)

    })
}

export function showPaginate(qty) {
    paginations.innerHTML = "";
    for (let i = 1; i <= qty; i++) {
        const btn = document.createElement("button");
        btn.className = "buttons"
        btn.innerHTML = i;

        btn.onclick = () => {
            getStudents(i);
        };

        paginations.append(btn);
    }
}

export{ShowUser}

