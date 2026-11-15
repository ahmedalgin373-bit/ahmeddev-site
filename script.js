function welcomeMessage() {
    document.getElementById("welcome").textContent =
    "Welcome Ahmed! Keep Coding!";
}

document.getElementById("welcomeButton")
    .addEventListener("click", welcomeMessage);
