// Fix querySelector to target the class correctly
var imgcont = document.querySelector('.image-grid'); // Use .container for a class selector
var btn = document.querySelector('.btn'); // This is fine as it matches the button class

btn.addEventListener('click', function () {
    addImage(); // Call the function on button click
});

function addImage() {
    var imgnum = 9; // Number of new images to add
    for (var i = 0; i < imgnum; i++) {
        // Create a new image element
        var newImage = document.createElement('img');
        // Set attributes like src, class for Tailwind styling, and alt text
        newImage.src = "https://picsum.photos/300/300?random=" + Math.floor(Math.random() * 2000);
        newImage.alt = "Random Image " + (i + 1); // Optional: Add alt text for accessibility
        newImage.className = "m-[10px] rounded-[10px] shadow-md bg-[lightgrey] w-[300px] h-[300px]";
        // Append the new image to the container
        imgcont.appendChild(newImage);
    }
}
