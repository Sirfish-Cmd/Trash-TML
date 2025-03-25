function rolldice() {
  const numDice = parseInt(document.getElementById("num").value);
  const resultDiv = document.getElementById("re");
  const imgDiv = document.getElementById("img");

  // Clear previous results
  resultDiv.innerHTML = "";
  imgDiv.innerHTML = "";

  let totalSum = 0;

  for (let i = 0; i < numDice; i++) {
    // Generate random dice value (1-6)
    const diceValue = Math.floor(Math.random() * 6) + 1;
    totalSum += diceValue;

    // Create image for this dice roll
    const diceImg = document.createElement("img");
    diceImg.src =
      `https://upload.wikimedia.org/wikipedia/commons/` +
      (diceValue === 1
        ? "2/2c/Alea_1.png"
        : diceValue === 2
        ? "b/b8/Alea_2.png"
        : diceValue === 3
        ? "2/2f/Alea_3.png"
        : diceValue === 4
        ? "8/8d/Alea_4.png"
        : diceValue === 5
        ? "5/55/Alea_5.png"
        : "f/f4/Alea_6.png");
    diceImg.alt = `Dice ${diceValue}`;
    diceImg.className = "dice-image";

    imgDiv.appendChild(diceImg);
  }

  // Display the sum of dice
  resultDiv.textContent = `Total: ${totalSum}`;
}
