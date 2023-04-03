const menuSec = document.getElementById("menuSec");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");

rightArrow.addEventListener("click", ()=>{
    menuSec.scrollLeft += 115;
})
leftArrow.addEventListener("click", ()=>{
    menuSec.scrollLeft -= 115;
})

let video = document.getElementsByTagName("video")[0];
let playVideo = document.getElementsByClassName("playVideo")[0];
let pauseVideo = document.getElementsByClassName("pauseVideo")[0];
let imgVdeo = document.getElementsByClassName("imgVdeo")[0];

playVideo.addEventListener("click", ()=>{
    video.play();
    playVideo.style.display = "none";
    imgVdeo.style.display ="none";
    pauseVideo.style.display = "flex"
})

pauseVideo.addEventListener("click", ()=>{
    video.pause();
    playVideo.style.display = "flex";
    imgVdeo.style.display ="flex";
    pauseVideo.style.display = "none"
})

