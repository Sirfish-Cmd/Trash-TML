var container = document.querySelector('#container');
var career = ["VENGEANCE", "NIGHT", "BATMAN"];
var careerindex = 0;
var characterindex = 0;
updatetext();
function updatetext() {
    characterindex++;
    container.innerHTML = "<h1>I AM " + career[careerindex].slice(0, characterindex) + "</h1>";
    if (characterindex === career[careerindex].length) {
        careerindex++;
        characterindex = 0;
    }
    if (careerindex === career.length) {
        careerindex = 0;
    }
    setTimeout(updatetext, 400);
}
