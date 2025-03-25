const bodyel = document.querySelector('body');

bodyel.addEventListener("mousemove", (event) => {

  const x = event.offsetX;
  const y = event.offsetY;

  const spanel = document.createElement("span");

  spanel.style.left = x + "px";
  spanel.style.top = y + "px";

  bodyel.appendChild(spanel);

  setTimeout(() => {
    spanel.remove();
  }, 3000);
});