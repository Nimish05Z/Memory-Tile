//This is to load the html page first then the js file
document.addEventListener("DOMContentLoaded", function () {
  // Enter name of the player
  function showModal() {
    const modal = document.querySelector(".modal");
    modal.style.display = "block";
  }

  localStorage.setItem("userDetails",JSON.stringify(obj));
  let userDetails=JSON.parse(localStorage.getItem("userDetails"));
  console.log(userDetails);
  let nickName=userDetails.nickName;
  let userName=userDetails.userName;

  // Start the game
  function startGame() {
    const modal = document.querySelector(".modal");
    const playerNameInput = document.getElementById("playerName");
    const playerNickNameInput = document.getElementById("playerNickName");
    const playerName = playerNameInput.value.trim();
    const playerNickName = playerNickNameInput.value.trim();
    
    // Player name cant be empty
    if (!playerName) {
      alert("Please enter your name.");
      return;
    }
    if (!playerNickName) {
      alert("Please enter your name.");
      return;
    }

    let userName = document.getElementById("playerName").value;
    let nickName = document.getElementById("playerNickName").value;

    let obj={
      userName,
      nickName
    }

    let nameHead = document.getElementById("name");
    console.log(nameHead);
    nameHead.innerHTML=`${nickName}'s&nbsp= `;
    
    nameHead.style.margin="25px";
    nameHead.style.marginRight="-100px";
    nameHead.style.fontSize="60px";

    // Hide the modal asking for player name
    modal.style.display = "none";

    // Start time as soon as the game starts
    const startTime = new Date().getTime();
    let timerInterval;
    let movesCount = 0;

    // Update seconds and minutes
    function updateTimer() {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - startTime;
      const minutes = Math.floor(elapsedTime / (1000 * 60));
      const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

      document.getElementById("time").innerText = `${minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds}`;
    }

    timerInterval = setInterval(updateTimer, 1000);

    // Setting Tiles and images
    const tilesContainer = document.querySelector(".tiles");
    const images = [
      "url('https://img.freepik.com/free-photo/digital-lavender-natural-landscape_23-2150538378.jpg?t=st=1700916271~exp=1700919871~hmac=51a92657d81dcbf51ce9eb7dcf4414d872b770e680b67622111b7d2b620da6cf&w=1380')",
      "url('https://img.freepik.com/free-photo/natures-beauty-reflected-tranquil-mountain-waters-generative-ai_188544-7867.jpg?w=1060&t=st=1700918250~exp=1700918850~hmac=df17b2cec793857ac04c2fde2504b011bb740d02e198f7de671535ff4b472187')",
      "url('https://img.freepik.com/free-photo/digital-painting-mountain-with-colorful-tree-foreground_1340-25699.jpg?t=st=1700914656~exp=1700918256~hmac=2e196772528cea06053a4a84296a9bd49baa5a18a2eb059f05a8530def982a88&w=1060')",
      "url('https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?w=1380&t=st=1700918254~exp=1700918854~hmac=e8c0346d553aa9f1348f216f8370fb145cec7150cbf3601d96bf838f9060e7cf')",
      "url('https://cdn.pixabay.com/photo/2022/12/22/18/48/summer-7672783_1280.jpg')",
      "url('https://cdn.pixabay.com/photo/2023/04/14/23/06/ai-generated-7926621_1280.jpg')",
      "url('https://cdn.pixabay.com/photo/2022/12/01/04/34/sunset-7628289_1280.jpg')",
      "url('https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    ];

    // Duplicating the images
    const imagesPicklist = [...images, ...images];
    const tileCount = imagesPicklist.length;

    let revealedCount = 0;
    let activeTile = null;
    let awaitingEndOfMove = false;

    //Displaying message try again and you found a match at the bottom 
    function updateGameMessage(message) {
      const gameMessageElement = document.getElementById("game-message");
      gameMessageElement.textContent = message;

      // Display the message container
      const messageContainer = document.querySelector(".message-container");
      messageContainer.style.display = "block";

      // Hide the message container after a short delay (adjust as needed)
      setTimeout(() => {
        messageContainer.style.display = "none";
      }, 1000); // Displaying message for 1 second
    }

    // Creating tiles
    function buildTile(imageUrl) {
      const element = document.createElement("div");

      element.classList.add("tile");
      element.setAttribute("data-image", imageUrl);
      element.setAttribute("data-revealed", "false");

      element.addEventListener("click", () => {
        const revealed = element.getAttribute("data-revealed");

        if (
          awaitingEndOfMove ||
          revealed === "true" ||
          element == activeTile
        ) {
          return;
        }

        // Display the image in the tile
        element.style.backgroundImage = imageUrl;

        if (!activeTile) {
          activeTile = element;
          return;
        }

        const imageToMatch = activeTile.getAttribute("data-image");

        if (imageToMatch === imageUrl) {
          element.setAttribute("data-revealed", "true");
          activeTile.setAttribute("data-revealed", "true");

          activeTile = null;
          awaitingEndOfMove = false;
          revealedCount += 2;
          movesCount++;

          if (revealedCount === tileCount) {
            clearInterval(timerInterval);
            window.location.href = "../gameOver/gameOver.html";
            
            showEndGamePopup(playerName, movesCount, minutes, seconds);
          }

          document.getElementById("moves-count").innerText = movesCount;

          updateGameMessage("You found a match!");
          return;
        }

        awaitingEndOfMove = true;

        setTimeout(() => {
          activeTile.style.backgroundImage = null;
          element.style.backgroundImage = null;

          awaitingEndOfMove = false;
          activeTile = null;
          movesCount++;
          document.getElementById("moves-count").innerText = movesCount;

          updateGameMessage("Try again!");
        }, 500);
      });

      return element;
    }

    for (let i = 0; i < tileCount; i++) {
      const randomIndex = Math.floor(
        Math.random() * imagesPicklist.length
      );
      const imageUrl = imagesPicklist[randomIndex];
      const tile = buildTile(imageUrl);

      imagesPicklist.splice(randomIndex, 1);
      tilesContainer.appendChild(tile);
    }
  }

  //End screen function  
  function showEndGamePopup(playerName, movesCount, minutes, seconds) {
    const popup = document.querySelector(".end-game-popup");
    const popupContent = document.querySelector(".popup-content");

    const message = document.createElement("p");
    message.textContent = `Congratulations, ${playerName}! You won in ${movesCount} moves, ${minutes} minutes, and ${seconds} seconds.`;

    const homeButton = document.createElement("button");
    homeButton.textContent = "Home";
    homeButton.addEventListener("click", () => location.reload());

    const playAgainButton = document.createElement("button");
    playAgainButton.textContent = "Play Again";
    playAgainButton.addEventListener("click", () => {
      location.reload();
    });

    const settingsButton = document.createElement("button");
    settingsButton.textContent = "Settings";

    popupContent.innerHTML = "";
    popupContent.appendChild(message);
    popupContent.appendChild(homeButton);
    popupContent.appendChild(playAgainButton);
    popupContent.appendChild(settingsButton);

    popup.style.display = "block";
  }

  showModal();

  const startButton = document.getElementById("startButton");
  startButton.addEventListener("click", startGame);
  var scoreMain = localStorage.setItem("movesCount");
  var minutesMain = localStorage.setItem("minutes");
  var secondsMain = localStorage.setItem("seconds");
  
});
