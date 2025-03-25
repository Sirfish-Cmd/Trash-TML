const email= `Og@gmail.com`
let username=email.slice(0,email.indexOf(`@`));
let ex=email.slice(email.indexOf(`@` +1 ));
console.log(username);
console.log(ex);
