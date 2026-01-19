export function renderPromo() {
    return `
    <div class="promo">
        <div class="promo__code">SALE10</div>
        <span class="promo__text">
            И получите скидку 10% на первый заказ онлайн!
        </span>
    </div>
  `;
}

export function renderContactForm() {
    return `
    <form class="contact-form" novalidate>
      <div class="contact-form__group">
        <input class="contact-form__input" type="text" name="name" required minlength="2" maxlength="30" placeholder="Имя">
        <span class="error-message">Введите корректное имя</span>
      </div>

      <div class="contact-form__group">
        <input class="contact-form__input" type="email" required placeholder="Email">
        <span class="error-message">Введите корректный email</span>
      </div>

      <div class="contact-form__group">
        <input class="contact-form__input" type="tel" required placeholder="Телефон">
        <span class="error-message">Введите корректный номер телефона</span>
      </div>

      <button class="btn btn--filled" type="submit">Отправить</button>
    </form>
  `;
}

export function renderQuiz(questions) {
    return `
    <form class="quiz" novalidate>
      ${questions.map((q, index) => `
        <div class="quiz__question">
          <p class="quiz__title">${q.question}</p>

          ${q.options.map(option => `
            <label class="quiz__option">
              <input type="radio" name="q${index}" required>
              <span>${option}</span>
            </label>
          `).join("")}

          <span class="error-message">Выберите вариант</span>
        </div>
      `).join("")}

      <button class="btn btn--filled" type="submit">
        Завершить
      </button>
    </form>
  `;
}