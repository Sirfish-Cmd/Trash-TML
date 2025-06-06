const choices = ["rock", "paper", "scissors"];
const playerdisplay = document.getElementById("playerdisplay");
const computerdisplay = document.getElementById("computerdisplay");
const resultdisplay = document.getElementById("rd");
const playerscoredisplay = document.getElementById("playerscoredisplay");
const computerscoredisplay = document.getElementById("computerscoredisplay");
let playerscore = 0;
let computerscore = 0;

function playgame(playerchoice) {
    const computerchoice = choices[Math.floor(Math.random() * 3)];
    let result = "";
    if (playerchoice === computerchoice) {
        result = "IT'S A TIE";
    } else {
        switch (playerchoice) {
            case "rock":
                result = (computerchoice === "scissors") ? "YOU WON" : "YOU LOST";
                break;
            case "paper":
                result = (computerchoice === "rock") ? "YOU WON" : "YOU LOST";
                break;
            case "scissors":
                result = (computerchoice === "paper") ? "YOU WON" : "YOU LOST";
                break;
        }
    }

    playerdisplay.textContent = `PLAYER: ${playerchoice}`;
    computerdisplay.textContent = `COMPUTER: ${computerchoice}`;
    resultdisplay.textContent = result;

    resultdisplay.classList.remove("green", "red");

    switch (result) {
        case "YOU WON":
            resultdisplay.classList.add("green");
            playerscore++;
            playerscoredisplay.textContent = playerscore;
            break;
        case "YOU LOST":
            resultdisplay.classList.add("red");
            computerscore++;
            computerscoredisplay.textContent = computerscore;
            break;
    }
}
