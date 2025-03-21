function rolldice() {
    const num = document.getElementById('num').value;
    const re = document.getElementById('re');
    const img = document.getElementById('img');
    const values = [];
    const images = [];

    for (let i = 0; i < num; i++) {
        const value = Math.floor(Math.random() * 6) + 1;
        values.push(value);
        images.push(`<img src="Die/${value}.png">`);
    }

    re.textContent = `Dice: ${values.join(', ')}`;
    img.innerHTML = images.join('');
}
