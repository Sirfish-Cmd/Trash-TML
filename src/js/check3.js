const A1=document.getElementById('A1');
const A2=document.getElementById('A2');
const A3=document.getElementById('A3');
const A4=document.getElementById('A4');
const B1=document.getElementById('B1');
const B2=document.getElementById('B2');
const B3=document.getElementById('B3');
B1.onclick=function()
    {
        if (A1.checked)
        {
            B2.textContent='you Are Subscribed';
        }
        else
        {
            B2.textContent='you Are not Subscribed';
        }
        if (A2.checked)
        {
            B3.textContent='you are pauing with visa';
        }
        else if (A3.checked)
        {
            B3.textContent='you are pauing with Master';
        }
        else if (A4.checked)
            {
                B3.textContent='you are pauing with Pay Pak';
            }
            else
            {
                B3.textContent='you must choose a payment method';
            }
    }
