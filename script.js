// script.js
window.onload = function () {
  const startButton = document.getElementById("start-button");
  let game;

  function startGame() {
    game = new Game();
    game.start();
    document.getElementById('game-intro').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    document.addEventListener('keydown', handleKeydown);
  }

  function handleKeydown(event) {
    const key = event.key;
    const possibleKeystrokes = ["ArrowUp", "ArrowDown"];

    if (possibleKeystrokes.includes(key)) {
      event.preventDefault();

      switch (key) {
        case "ArrowUp":
          game.player.directionY = -4;
          break;
        case "ArrowDown":
          game.player.directionY = 4;
          break;
      }
    }
  }

  startButton.addEventListener("click", function () {
    startGame();
  });
  ////////////////////
 // 1000 milliseconds = 1 second
    ////////////////////////////////
    let restartbutton = document.getElementById("restart-button");
    restartbutton.addEventListener("click", function () {
      location.reload();
    });
  }
