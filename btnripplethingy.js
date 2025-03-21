var btn = document.querySelector('.btn');
btn.addEventListener("mouseover", function (e) {
    var x = e.pageX - btn.offsetLeft;
    var y = e.pageY - btn.offsetTop;
    btn.style.setProperty("--x", "".concat(x, "px"));
    btn.style.setProperty("--y", "".concat(y, "px"));
});
