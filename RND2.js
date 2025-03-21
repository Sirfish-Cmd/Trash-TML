const A1 = document.getElementById('A1');
const A2 = document.getElementById('A2');
const min =1;
const max=6;
let ran;
A1.onclick= function()
    {
        ran = Math.floor(Math.random() * (max - min + 1)) + min;
        A2.textContent = ran
    }

