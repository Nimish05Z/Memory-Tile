
function musicButton() {
  var button = document.getElementById("music-button");
  var audio = document.getElementById('audio');

  // Check if the button is currently "off"
  if (button.classList.contains("off")) {
      // If "off", turn it "on"
      button.innerHTML = "MUSIC - ON";
      button.classList.remove("off");
      audio.play();
      localStorage.setItem("musicState", "true");
  } 
  else {
      // If "on", turn it "off"
      button.innerHTML = "MUSIC - OFF";
      button.classList.add("off");
      audio.pause();
      localStorage.setItem("musicState", "false");
  }
}