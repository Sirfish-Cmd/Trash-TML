const A1=document.getElementById("A1")
const A2=document.getElementById("A2")
const A3=document.getElementById("A3")
const A4=document.getElementById("A4")
let count=0

A4.onclick = function()
{
    count++
A1.textContent =count;
}
A2.onclick = function()
{
    count--
A1.textContent =count;
}
A3.onclick = function()
{
    count=0
A1.textContent =count;
}