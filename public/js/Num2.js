const mini=1
const max=100
let guess
let attempts=0
let answer = Math.floor(Math.random()*(-mini+max+1))+mini
let running =true
while(running)
{
    guess=window.prompt(`Guess a Numer Between ${mini} and ${max}`)
    guess=Number(guess)
    if (isNaN(guess))
    {
        window.alert(`PleaseEnter a Number`)
    }
    else if (guess>=1 && guess>=100)
    {
        window.alert(`Enter Number between ${mini} and ${max}`)
    }
    else
    {
        attempts++
    }
    if (guess>answer)
    {
        window.alert(`TOO HIGH`)
    }
        else if ( guess<answer)
        {
            window.alert(`TOO LOW`)
        }
    else 
    {
        window.alert(`CORRECT,The Answer is ${answer} and Number of Attemts is ${attempts}`)
        running=false
    }
}