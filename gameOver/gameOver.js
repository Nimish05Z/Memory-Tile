const score = localStorage.getItem("scoreMain");
const mins = localStorage.getItem("minutesMain");
const secs = localStorage.getItem("secondsMain");


document.getElementById("finalScore").innerText = score;
document.getElementById("time").innerText = mins + " minutes " + secs + " seconds"; 