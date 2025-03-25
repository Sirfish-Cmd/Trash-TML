const btn = document.querySelector('.btn') as HTMLButtonElement;

btn.addEventListener("mouseover", (e: MouseEvent) => {
    const x = e.pageX - btn.offsetLeft;
    const y = e.pageY - btn.offsetTop;

    btn.style.setProperty("--x", `${x}px`);
    btn.style.setProperty("--y", `${y}px`);
});