const imgcont=document.querySelector('container');
const btn=document.querySelector('.btn');

btn.addEventListener('click',()=>{
    addImage();
});

function addImage() {
    let imgnum = 10; // Added missing declaration for imgnum
    for (let i = 0; i < imgnum; i++) {
        const newImage = document.createElement('img');
        newImage.src = `https://picsum.photos/300/300?random=${Math.floor(Math.random() * 2000)}`;
        imgcont.appendChild(newImage);
    }
}