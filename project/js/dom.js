import { UserManager } from "./api.js";

export class DOMManager {
    static box = document.querySelector(".box");
    static statusFilter = document.querySelector(".statusFilter");
    static search = document.querySelector(".search");
    static FileImage = document.querySelector(".FileImage");
    static Avatar = document.querySelector(".Avatar");

    static async showData(data) {
        DOMManager.box.innerHTML = "";
        data.forEach(u => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${u.id}</td>
                <td>${u.name}</td>
                <td>${u.email}</td>
                <td>${u.status ? "Online" : "Offline"}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                  <input type="checkbox" class="check"/>
                </td>
            `;
            const check = tr.querySelector(".check");
            check.checked = u.status;
            check.onclick = async () => {
                await UserManager.update({ ...u, status: !u.status });
                const all = await UserManager.getAll();
                DOMManager.showData(all);
            };
            DOMManager.box.appendChild(tr);
        });
    }

    static async setup() {
       
        DOMManager.FileImage.onchange = async e => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = async ev => {
                const base64 = ev.target.result;
                DOMManager.Avatar.src = base64;
                await UserManager.addAvatar(base64);
            };
            reader.readAsDataURL(file);
        };

      
        DOMManager.statusFilter.onchange = async e => {
            const value = e.target.value;
            const data = await UserManager.getAll();
            const filtered = value === "" ? data : data.filter(u => u.status === (value === "true"));
            DOMManager.showData(filtered);
        };


        DOMManager.search.oninput = async e => {
            const value = e.target.value.toLowerCase();
            const data = await UserManager.getAll();
            const filtered = value ? data.filter(u => u.name.toLowerCase().includes(value)) : data;
            DOMManager.showData(filtered);
        };
    }
}