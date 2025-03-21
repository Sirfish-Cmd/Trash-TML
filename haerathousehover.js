var bodyel = document.querySelector('body');
bodyel.addEventListener("mousemove", function (event) {
    var x = event.offsetX;
    var y = event.offsetY;
    var spanel = document.createElement("span");
    var size = Math.random() * 100;
    spanel.style.width = size + "px";
    spanel.style.height = size + "px";
    spanel.style.left = x + "px";
    spanel.style.top = y + "px";
    bodyel.appendChild(spanel);
    setTimeout(function () {
        spanel.remove();
    }, 3000);
});
