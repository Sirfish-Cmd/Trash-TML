// 🎉 Welcome to the Job Stats Thingy! 🎉
// This TypeScript file is responsible for animating the counters in the jobthingystatus.html file.
// Let's make those numbers count up in style! 🚀
// Function to animate a counter from 0 to a target value
function animateCounter(element, target, duration) {
    var start = 0; // Start from zero
    var increment = target / (duration / 16); // Calculate increment per frame (assuming 60fps)
    // Function to update the counter
    var updateCounter = function () {
        start += increment; // Increment the counter
        if (start < target) {
            element.textContent = Math.ceil(start).toString(); // Update the text content
            requestAnimationFrame(updateCounter); // Request the next frame
        }
        else {
            element.textContent = target.toString(); // Ensure the final value is set
        }
    };
    updateCounter(); // Start the animation
}
// 🎯 Let's target those counter elements and animate them! 🎯
document.addEventListener('DOMContentLoaded', function () {
    var counters = document.querySelectorAll('.counter'); // Select all elements with the class 'counter'
    counters.forEach(function (counter) {
        var target = parseInt(counter.getAttribute('data-ceil') || '0', 10); // Get the target value from data attribute
        animateCounter(counter, target, 2000); // Animate each counter over 2 seconds
    });
});
