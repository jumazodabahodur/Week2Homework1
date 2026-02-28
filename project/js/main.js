import { UserManager } from "./api.js";
import { DOMManager } from "./dom.js";

async function init() {
    await DOMManager.setup();
    const data = await UserManager.getAll();
    DOMManager.showData(data);
}

init();