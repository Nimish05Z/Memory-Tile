bgmusic = localStorage.getItem("musicState");
let audio=document.getElementById("audio");
console.log(bgmusic);

if (bgmusic == true) {
    audio.play();
} else {
    audio.pause();
}