"use strict";
const text = document.getElementById("textarea");
const total = document.getElementById("total");
const rem = document.getElementById("rem");
text === null || text === void 0 ? void 0 : text.addEventListener("keyup", () => {
    upcc();
});
function upcc() {
    total.innerHTML = text.value.length.toString();
    const maxLength = text.getAttribute("maxlength");
    rem.innerText = maxLength ? (parseInt(maxLength) - text.value.length).toString() : "N/A";
}
