export function initShowcase() {
    renderProducts();
    filter();
}

const products = [
    {
        id: 1,
        title: "Товар 1",
        price: "5 990₽",
        category: "premium",
        icon: "🎨",
        description: "lorem ipsum dolor sit amet, consetetur"
    },
    {
        id: 2,
        title: "Товар 2",
        price: "3 490₽",
        category: "sale",
        icon: "🎭",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit "
    },
    {
        id: 3,
        title: "Товар 3",
        price: "7 990₽",
        category: "new",
        icon: "🎪",
        description: "lorem ipsum dolor sit amet, consetetur adipiscing elit, "
    },
    {
        id: 4,
        title: "Товар 4",
        price: "4 590₽",
        category: "premium",
        icon: "🎬",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
    },
    {
        id: 5,
        title: "Товар 5",
        price: "2 990₽",
        category: "sale",
        icon: "🎯",
        description: "lorem ipsum dolor sit amet, consetetur"
    },
    {
        id: 6,
        title: "Товар 6",
        price: "6 990₽",
        category: "new",
        icon: "🎸",
        description: "lorem ipsum dolor sit amet, consetetur"
    },
    {
        id: 7,
        title: "Товар 7",
        price: "8 990₽",
        category: "premium",
        icon: "🎹",
        description: "lorem ipsum dolor sit amet, consetetur"
    },
    {
        id: 8,
        title: "Товар 8",
        price: "1 990₽",
        category: "sale",
        icon: "🎺",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
    },
];

function renderProducts(filter = "all") {
    const grid = document.getElementById("showcaseProduct");
    const filteredProducts = filter === "all"
        ? products
        : products.filter(p => p.category === filter);

    grid.innerHTML = filteredProducts.map(product => `
        <article class="product-card" data-category="${product.category}" itemscope itemtype="https://schema.org/Product">
            <div class="product-card__image" itemprop="image">
                ${product.icon}
            </div>
            <div class="product-card__info">
                <h3 class="product-card__title" itemprop="name">${product.title}</h3>
                <span class="product-card__price" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
                    <meta itemprop="priceCurrency" content="RUB">
                    <span itemprop="price" content="${product.price.replace(/\D/g, '')}">${product.price}</span>
                </span>
                <span class="product-card__description" itemprop="description">
                    ${product.description}
                </span>
            </div>
        </article>
    `).join("");

    document.querySelectorAll(".product-card").forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        setTimeout(() => {
            card.style.transition = "all 0.5s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, index * 100);
    });
}

function filter() {
    document.querySelectorAll(".btn--outlined").forEach(btn => {
        btn.addEventListener("click", () => {
            document
                .querySelectorAll(".btn--outlined")
                .forEach(b => b.classList.remove("btn--active"));

            btn.classList.add("btn--active");
            renderProducts(btn.dataset.filter);
        });
    });
}