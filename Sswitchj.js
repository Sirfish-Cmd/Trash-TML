const slides=document.querySelectorAll(".slides img");
let slideindex =0;
let intervalid=0;

document.addEventListener("DOMContentLoaded",initializeslider)

function initializeslider()
{
    if(slides.length>0)
    {
        slides[slideindex].classList.add("displayslide")
        intervalid=setInterval(nextslide,5000)
    }
}
function showslide(index)
{
    if(index>=slides.length)
    {
        slideindex=0
    }
    else if (index<0)
    {
        slideindex=slides.length-1
    }
    slides.forEach(slide => 
    {
        slide.classList.remove("displayslide")
    }
    )
    slides[slideindex].classList.add("displayslide")
}
function preslide()
{
    clearInterval(intervalid)
    slideindex--
    showslide(slideindex)
}
function nextslide()
{
    slideindex--
    showslide(slideindex)
}