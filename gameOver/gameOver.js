const score = localStorage.getItem("scoreMain");
const mins = localStorage.getItem("minutesMain");
const secs = localStorage.getItem("secondsMain");


let movestime = JSON.parse(localStorage.getItem("movestime"));
let totalCount = movestime.totalMoves;
let totalTime = movestime.totalTime;
console.log(movestime);
console.log(totalCount);
console.log(totalTime);

let userDetails = JSON.parse(localStorage.getItem("userDetails"));
let usersName=userDetails.userName;
let nicksName=userDetails.nickName;
console.log(userDetails);
console.log(usersName);
console.log(nicksName);