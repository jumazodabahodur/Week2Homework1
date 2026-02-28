import { DOMManager } from "./dom.js";

const API = "http://localhost:3001/users";

export class UserManager {
    static async getAll() {
        try {
            const res = await axios.get(API); 
            return res.data;
        } catch (e) { console.error(e); return []; }
    }

    static async update(user) {
        try { 
            await axios.put(`${API}/${user.id}`, user); 
        }
        catch (e) { console.error(e); }
    }

    static async addAvatar(base64) {
        try {
            const res = await axios.post(API, { avatar: base64 });
            const data = await UserManager.getAll();
            DOMManager.showData(data);
        } catch (e) { console.error(e); }
    }
}
