const A1=document.getElementById("A1")
const A2=document.getElementById("A2")
const A3=document.getElementById("A3")
const B1=document.getElementById("B1")
let temp

function convert()
{
    if(A2.checked)
    {
        temp=Number(A1.value)
        temp=temp*9/5+32;
        B1.textContent=temp.toFixed(1)+ "C"
    }
    else if(A3.checked)
    {
        temp=Number(A1.value)
        temp=(temp -32)*(5/9);
        B1.textContent=temp.toFixed(1)+ "F"
    }
    else
    {
        B1.textContent="Select a unit";
    }
}