const display=document.getElementById("dis");

function appendtodisplay(input)
{
    display.value +=input;
}
function cal()
{
    try{
        display.value =eval(display.value);
    }
    catch(error)
    {
display.value="Error"
    }
}
function cls()
{
    display.value="";
}
<style>
    
</style>