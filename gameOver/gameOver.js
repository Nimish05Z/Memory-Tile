let movestime = JSON.parse(localStorage.getItem("movestime"));
let totalCount = movestime.totalMoves;
let totalTime = movestime.totalTime;

let userDetails = JSON.parse(localStorage.getItem("userDetails"));
let usersName=userDetails.userName;
let nicksName=userDetails.nickName;

var a =`${nicksName}'s Scoreboard`;
const b =`Total Moves = ${totalCount}`;
let c =`Time Taken = ${totalTime}`;

document.getElementById("scoreboardHeading").innerText = a;
document.getElementById("usermoves").innerText = b;
document.getElementById("usertime").innerText = c;