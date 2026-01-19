export function createModal() {
    return `
        <div class="modal" id="appModal">
            <div class="modal__window">
                <button class="modal__close" data-close></button>

                <h2 class="modal__title"></h2>
                <p class="modal__text"></p>

                <div class="modal__content"></div>
            </div>
        </div>
    `;
}