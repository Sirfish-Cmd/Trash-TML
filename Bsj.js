// Form submission handling
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if(name && email && message) {
        document.getElementById('formFeedback').innerText = 'Thank you for reaching out! We will get back to you shortly.';
        document.getElementById('formFeedback').style.color = 'green';
    } else {
        document.getElementById('formFeedback').innerText = 'Please fill out all fields.';
        document.getElementById('formFeedback').style.color = 'red';
    }
});
