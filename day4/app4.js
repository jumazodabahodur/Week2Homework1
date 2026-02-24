import { DeleteUser, PostUser, EditUserApi, FilterByStatus, FilterByCategory, GetUser } from "./api4.js";

const AddModal = document.querySelector(".AddModal");
const AddForm = document.querySelector(".AddForm");
const EditModal = document.querySelector(".EditModal");
const EditForm = document.querySelector(".EditForm");
const filterByStatus = document.querySelector(".filterByStatus");
const filterByCategory = document.querySelector(".filterByCategory"); // новый select
const Add = document.querySelector(".Add");
const box = document.querySelector(".box");
const checkboxAll = document.getElementById("checkboxAll");
const deleteSelectedBtn = document.querySelector(".DeleteSelected");

let idx = null;


function ShowUser(data) {
    box.innerHTML = "";

    if (data.length === 0) {
        const tr = document.createElement("tr");
        tr.innerHTML = "<td colspan='6'>No users found</td>";
        box.append(tr);
        return;
    }

    data.forEach(el => {
        const tr = document.createElement("tr");

        const select = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("rowCheckbox");
        checkbox.dataset.id = el.id;
        select.append(checkbox);

        const avatar = document.createElement("img");
        avatar.src = el.avatar;
        const name = document.createElement("td");
        name.innerText = el.name;
        const age = document.createElement("td");
        age.innerText = el.age;
        const status = document.createElement("td");
        status.innerText = el.status === "true" ? "🟢 Active" : "🔴 Inactive";
        const category = document.createElement("td");
        category.innerText = el.category || "-"; 

        const action = document.createElement("td");
        const btnDel = document.createElement("button");
        const btnEdit = document.createElement("button");
        btnDel.innerText = "🗑️";
        btnEdit.innerText = "✏️";

        btnDel.onclick = () => { DeleteUser(el.id); GetUser(); };
        btnEdit.onclick = () => { 
            idx = el.id;
            EditForm["avatar"].value = el.avatar;
            EditForm["name"].value = el.name;
            EditForm["age"].value = el.age;
            EditModal.show();
        };

        action.append(btnDel, btnEdit);
        tr.append(select, avatar, name, age, status, category, action);
        box.append(tr);
    });

    initRowCheckboxes();
}


function initRowCheckboxes() {
    box.addEventListener("change", e => {
        if (e.target.dataset && e.target.dataset.id) {
            const all = document.querySelectorAll(".rowCheckbox");
            checkboxAll.checked = Array.from(all).every(cb => cb.checked);
        }
    });

    checkboxAll.addEventListener("change", () => {
        document.querySelectorAll(".rowCheckbox").forEach(cb => cb.checked = checkboxAll.checked);
    });

    deleteSelectedBtn.onclick = () => {
        const selected = document.querySelectorAll(".rowCheckbox:checked");
        selected.forEach(cb => DeleteUser(cb.dataset.id));
        checkboxAll.checked = false;
        GetUser();
    };
}


Add.onclick = () => AddModal.show();
AddForm.onsubmit = (e) => {
    e.preventDefault();
    const obj = {
        avatar: AddForm["avatar"].value,
        name: AddForm["name"].value,
        age: AddForm["age"].value
    };
    PostUser(obj);
    AddModal.close();
    AddForm.reset();
    GetUser();
};


EditForm.onsubmit = (e) => {
    e.preventDefault();
    const obj = {
        avatar: EditForm["avatar"].value,
        name: EditForm["name"].value,
        age: EditForm["age"].value
    };
    EditUserApi(obj, idx);
    EditModal.close();
    GetUser();
};


filterByStatus?.addEventListener("change", () => FilterByStatus(filterByStatus.value));
filterByCategory?.addEventListener("change", () => FilterByCategory(filterByCategory.value));

export { ShowUser, initRowCheckboxes };