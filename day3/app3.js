import { DeleteUser, PostUser, FilterByStatus,EditUserApi } from "./api3.js";

const box = document.querySelector(".box");
const AddModal = document.querySelector(".AddModal");
const AddForm = document.querySelector(".AddForm");
const Add = document.querySelector(".Add");
const filterByStatus = document.querySelector(".filterByStatus");
const EditModal = document.querySelector(".EditModal")
const EditForm = document.querySelector(".EditForm")
let idx = null

function ShowUser(data) {
  box.innerHTML = "";

  data.forEach((el) => {
    const tr = document.createElement("tr");
    const Id = document.createElement("td");
    const name = document.createElement("td");
    const avatarTd = document.createElement("td");
    const avatar = document.createElement("img");
    const date = document.createElement("td");
    const role = document.createElement("td");
    const status = document.createElement("td");
    const action = document.createElement("td");

    const btnDel = document.createElement("button");
    const btnEdit = document.createElement("button");

    Id.innerHTML = el.id;
    name.innerHTML = el.name;

    avatar.src = el.avatar;
    
    avatarTd.append(avatar);

    date.innerHTML = el.date;
    role.innerHTML = el.role;
status.innerHTML = el.status ? "🟢 Active" : "🔴 Inactive";
    btnDel.innerHTML = "⛔";
    btnEdit.innerHTML = "✏️";

    btnDel.onclick = () => DeleteUser(el.id);

    btnEdit.onclick = () =>{
        EditUser(el)
    }

    action.append(btnDel, btnEdit);
    tr.append(Id, avatarTd, name, date, role, status, action);
    box.append(tr);
  });
}

AddForm.onsubmit = (event) => {
  event.preventDefault();

  const user = {
    name: AddForm["name"].value,
    avatar: AddForm["avatar"].value,
    date: AddForm["date"].value,
    role: AddForm["role"].value,
    status: "Active",
  };

  PostUser(user);
  AddModal.close();
  AddForm.reset();
};

Add.onclick = () => AddModal.showModal();

filterByStatus.onchange = () => {
  const value = filterByStatus.value;
  console.log(value);
  
  FilterByStatus(value);
};

EditForm.onsubmit = (event) =>{
event.preventDefault()
const obj  = {
  name: EditForm["name"].value,
  avatar: EditForm["avatar"].value,
  date: EditForm["date"].value,
  role: EditForm["role"].value,
  status: EditForm["EditStatus"].value.status === "Active"
}
EditUserApi(obj,idx)
EditModal.close()
}


function EditUser(el){
    EditModal.showModal()
    idx = el.id
    EditForm["avatar"].value = el.avatar
    EditForm["name"].value = el.name
    EditForm["date"].value = el.date
    EditForm["role"].value = el.role
    EditForm["EditStatus"].value = el.status ?"true" :"false"

}

export { ShowUser};