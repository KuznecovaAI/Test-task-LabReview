export function initBurger() {
    const burger = document.getElementById('burgerMenu');
    const nav = document.querySelector('.header__nav');

    burger.addEventListener('click', () => {
        burger.classList.toggle('header__burger--active');
        nav.classList.toggle('header__nav--active');
        document.body.classList.toggle('page--no-scroll');
    });
}