import { ShowUser } from "./app3.js";

const API = "https://6966216af6de16bde44c5161.mockapi.io/users";

let users = [];

async function GetUser() {
  try {
    const response = await axios.get(API);
    users = response.data;
    ShowUser(users);
  } catch (error) {
    console.log(error);
  }
}
GetUser();

async function DeleteUser(id) {
  try {
    await axios.delete(`${API}/${id}`);
    GetUser();
  } catch (error) {
    console.log(error);
  }
}

async function PostUser(user) {
  try {
    await axios.post(API, user);
    GetUser();
  } catch (error) {
    console.log(error);
  }
}

function FilterByStatus(status) {
  if (!status) {
    ShowUser(users);
    return;
  }

  const filtered = users.filter(u => u.status === status);
  ShowUser(filtered);
}
async function EditUserApi (obj,id) {

try {
    await axios.put(`${API}/${id}`,obj)
    GetUser()
   
} catch (error) {
    console.log(error);
    
}

}
export { DeleteUser, PostUser, FilterByStatus,EditUserApi };