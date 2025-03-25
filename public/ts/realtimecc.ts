const text = document.getElementById("textarea") as HTMLTextAreaElement;
const total = document.getElementById("total") as HTMLSpanElement;
const rem = document.getElementById("rem") as HTMLSpanElement;

text?.addEventListener("keyup", () => {
    upcc();
});

function upcc() {
    total.innerHTML = text.value.length.toString();
    const maxLength = text.getAttribute("maxlength");
    rem.innerText = maxLength ? (parseInt(maxLength) - text.value.length).toString() : "N/A";
}
