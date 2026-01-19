export function initHeader() {
    renderHeaderMenu();
    hideMiddleHeader();
    headerDropdown();

}

const headerMenu = [
    {
        title: "Каталог продукции",
        href: "#",
        children: [
            {title: "Категория 1", href: "#"},
            {title: "Категория 2", href: "#"},
            {title: "Категория 3", href: "#"},
        ],
    },
    {
        title: "О компании",
        href: "#",
    },
    {
        title: "Новости",
        href: "#",
    },
    {
        title: "Доставка и оплата",
        href: "#",
    },
    {
        title: "Контакты",
        href: "#",
        children: [
            {title: "Связаться", href: "#",  isContact: true},
            {title: "Адреса", href: "#",  isContact: false},
        ],
    },
];



function renderHeaderMenu() {
    const navMenu = document.getElementById("navMenu");
    if (!navMenu) return;

    navMenu.innerHTML = headerMenu.map(item => {
        const hasDropdown = Array.isArray(item.children) && item.children.length;

        return `
            <li class="navigation__item ${hasDropdown ? 'navigation__item--has-dropdown' : ''}">
                <a href="${item.href}" class="navigation__link">
                    ${item.title}
                </a>

                ${hasDropdown ? `
                    <ul class="navigation__dropdown">
                        ${item.children.map(child => `
                            <li class="navigation__dropdown-item">
                                <a 
                                  href="${child.href}"
                                  ${child.isContact ? "data-contact" : ""}
                                >
                                  ${child.title}
                                </a>
                            </li>
                        `).join("")}
                    </ul>
                ` : ""}
            </li>`;
    }).join("");
}

function hideMiddleHeader() {
    const middleHeader = document.getElementById("headerMiddle");
    if (!middleHeader) return;

    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;

        if (currentScroll > lastScrollY && currentScroll > 50) {
            middleHeader.classList.add("header__middle--hidden");
        } else {
            middleHeader.classList.remove("header__middle--hidden");
        }

        lastScrollY = currentScroll;
    });
}


function headerDropdown() {
    const burger = document.getElementById("burgerMenu");
    const nav = document.querySelector(".header__nav");
    const mobileQuery = window.matchMedia("(max-width: 992px)");

    document.addEventListener("click", (e) => {
        if (mobileQuery.matches) return;

        const dropdowns = document.querySelectorAll(".navigation__item");
        dropdowns.forEach(item => {
            const dropdown = item.querySelector(".navigation__dropdown");
            if (!dropdown) return;

            if (!item.contains(e.target)) {
                item.blur();
                const focusedElement = item.querySelector(":focus");
                if (focusedElement) {
                    focusedElement.blur();
                }
            }
        });
    });

    const dropdownItems = document.querySelectorAll(".navigation__dropdown-item a");
    dropdownItems.forEach(link => {
        link.addEventListener("click", (e) => {
            const navItem = link.closest(".navigation__item");
            if (navItem) {
                navItem.blur();
                link.blur();
            }

            if (mobileQuery.matches) {
                burger?.classList.remove("header__burger--active");
                nav?.classList.remove("header__nav--active");
            }
        });
    });


    const navLinks = document.querySelectorAll(".navigation__item > a");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const navItem = link.parentElement;
            const hasDropdown = navItem.querySelector(".navigation__dropdown");

            if (hasDropdown && !mobileQuery.matches) {
                e.preventDefault();
                return;
            }

            if (mobileQuery.matches) {
                burger?.classList.remove("header__burger--active");
                nav?.classList.remove("header__nav--active");
            }

            link.blur();
        });
    });

    document.addEventListener("click", (e) => {
        if (!mobileQuery.matches) return;
        if (!nav?.classList.contains("header__nav--active")) return;

        const navMenu = document.getElementById("navMenu");
        const burgerElement = burger;

        if (navMenu && !navMenu.contains(e.target) && !burgerElement?.contains(e.target)) {
            burger?.classList.remove("header__burger--active");
            nav?.classList.remove("header__nav--active");
        }
    });

}