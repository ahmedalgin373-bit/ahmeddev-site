const languageButton = document.getElementById("languageButton");

let currentLanguage = "en";

languageButton.addEventListener("click", () => {
    currentLanguage = currentLanguage === "en" ? "ar" : "en";

    document.documentElement.lang = currentLanguage;
    document.documentElement.dir =
        currentLanguage === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-en]").forEach(element => {
        element.textContent =
            element.dataset[currentLanguage];
    });

    languageButton.textContent =
        currentLanguage === "en" ? "العربية" : "English";
});
