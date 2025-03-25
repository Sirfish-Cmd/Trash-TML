const input = document.querySelector<HTMLInputElement>(".input");
const body = document.querySelector("body");

if (!input || !body) {
    console.error("Required elements not found");
    throw new Error("Required elements not found");
}

function update() {
    body.style.backgroundColor = input.checked ? "lightblue" : "white";
    updateStore();
}

function updateStore() {
    localStorage.setItem("mode", JSON.stringify(input.checked));
}

function loadStoredState() {
    const storedMode = localStorage.getItem("mode");
    if (storedMode !== null) {
        input.checked = JSON.parse(storedMode);
        update();
    }
}

input.addEventListener("change", update);

// Load the stored state when the script runs
loadStoredState()