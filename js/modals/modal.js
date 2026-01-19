import {createModal} from "./modalTemplate.js";
import {modalConfigs} from "./modalConfigs.js";
import {renderContactForm, renderPromo, renderQuiz} from "./modalRenderers.js";
import {modalValidation} from "./modalValidation.js";

function renderContent(config) {
    switch (config.type) {
        case "promo":
            return renderPromo();
        case "contact-form":
            return renderContactForm();
        case "quiz":
            return renderQuiz(config.questions);
        default:
            return "";
    }
}


export function initModal() {
    document.body.insertAdjacentHTML("beforeend", createModal());

    const modal = document.getElementById("appModal");
    const titleEl = modal.querySelector(".modal__title");
    const textEl = modal.querySelector(".modal__text");
    const contentEl = modal.querySelector(".modal__content");

    let opened = false;

    let sessionState = {
        contactOpened: false,
        promoShown: false,
        quizShown: false,
    };

    modalValidation(modal);

    function openModal(key) {
        const config = modalConfigs[key];
        if (!config) return;

        if (opened) return;

        if (
            key === "promo" &&
            (sessionState.promoShown || sessionState.quizShown)
        ) return;

        if (
            key === "quiz" &&
            (sessionState.quizShown || sessionState.promoShown)
        ) return;

        opened = true;

        titleEl.textContent = config.title;
        textEl.textContent = config.text;
        contentEl.innerHTML = renderContent(config);

        modal.classList.add("modal--active");
        document.body.classList.add("page--no-scroll");

        if (key === "contact") {
            sessionState.contactOpened = true;
        }

        if (key === "promo") {
            sessionState.promoShown = true;
        }

        if (key === "quiz") {
            sessionState.quizShown = true;
        }
    }

    function closeModal() {
        modal.classList.remove("modal--active");
        document.body.classList.remove("page--no-scroll");
        opened = false;
    }

    modal.addEventListener("modal:close", closeModal);

    modal.addEventListener("click", e => {
        if (e.target === modal || e.target.closest("[data-close]")) {
            closeModal();
        }
    });

    setTimeout(() => {
        if (!sessionState.promoShown && !sessionState.contactOpened) {
            openModal("quiz");
        }
    }, 40000);

    const footer = document.getElementById("footer");

    if (footer) {
        const observer = new IntersectionObserver(entries => {
            if (
                entries[0].isIntersecting &&
                !sessionState.promoShown &&
                !sessionState.contactOpened
            ) {
                openModal("promo");
            }
        });

        observer.observe(footer);
    }

    document.addEventListener("click", e => {
        if (e.target.closest("[data-contact]")) {
            e.preventDefault();
            openModal("contact");
        }
    });
}

