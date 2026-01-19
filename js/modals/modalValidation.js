export function modalValidation(modal) {
    modal.addEventListener("submit", e => {
        const form = e.target.closest(".contact-form, .quiz");
        if (!form) return;

        e.preventDefault();

        let isValid = true;

        const fields = form.querySelectorAll("input, textarea, select");

        fields.forEach(field => {
            const error = field.closest(".contact-form__group, .quiz__question")
                ?.querySelector(".error-message");

            field.classList.remove("error");
            if (error) error.style.display = "none";

            if (field.type === "tel") {
                const value = field.value.trim();

                // 1. Проверка на буквы
                if (/[a-zA-Zа-яА-Я]/.test(value)) {
                    field.classList.add("error");
                    if (error) error.style.display = "block";
                    isValid = false;
                    return;
                }

                //  Получаем только цифры
                const digitsOnly = value.replace(/\D/g, '');

                // 2. Проверка что номер начинается с 7 (и +7 и просто 7)
                if (!digitsOnly.startsWith("7")) {
                    field.classList.add("error");
                    if (error) error.style.display = "block";
                    isValid = false;
                    return;
                }

                // 3. Проверка что всего 11 цифр (7 + 10 цифр номера)
                if (digitsOnly.length !== 11) {
                    field.classList.add("error");
                    if (error) error.style.display = "block";
                    isValid = false;
                    return;
                }
            }

            if (!field.checkValidity()) {
                field.classList.add("error");
                if (error) error.style.display = "block";
                isValid = false;
            }
        });

        if (!isValid) return;

        modal.dispatchEvent(new CustomEvent("modal:close"));
    });
}

