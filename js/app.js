import {initHeader} from "./header/header.js";
import {initBurger} from "./header/burger.js";
import {initShowcase} from "./showcase/showcase.js";
import {initModal} from "./modals/modal.js";


document.addEventListener("DOMContentLoaded", () => {
    initHeader();
    initBurger();
    initShowcase();
    initModal();
});
