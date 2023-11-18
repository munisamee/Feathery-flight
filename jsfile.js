// player.js
class Player {
  constructor(gameScreen, right, top, width, height, imgSrc) {
    this.gameScreen = gameScreen;
    this.right = right;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionY = 0;
    this.element = document.createElement('img');

    this.element.src = imgSrc;
    this.element.style.position = 'absolute';
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.top = `${top}px`;
    this.element.style.right = `${right}px`;

    this.gameScreen.appendChild(this.element);
    
  }

  move() {
    this.top += this.directionY;

    if (this.top < 10) {
      this.top = 10;
    }

    if (this.top > this.gameScreen.offsetHeight - this.height - 10) {
      this.top = this.gameScreen.offsetHeight - this.height - 10;
    }

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.top = `${this.top}px`;
    console.log('player position', this.element.getBoundingClientRect());
  }
//************* */
  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();
    

    
      // Define an offset to reduce the collision distance
      const collisionOffset =  180; // Adjust this value as needed
    
      if (
        playerRect.left + collisionOffset < obstacleRect.right &&
        playerRect.right - collisionOffset > obstacleRect.left &&
        playerRect.top + collisionOffset < obstacleRect.bottom &&
        playerRect.bottom - collisionOffset > obstacleRect.top
      ) {
        return true;
      } else {
        return false;
      }
    }
    ////////////////////////////
      didCollide(feather) {
    const playerRect = this.element.getBoundingClientRect();
    const featherRect = feather.element.getBoundingClientRect();

    const collisionOffset = 180; // Adjust this value as needed

    if (
      playerRect.left + collisionOffset < featherRect.right &&
      playerRect.right - collisionOffset > featherRect.left &&
      playerRect.top + collisionOffset < featherRect.bottom &&
      playerRect.bottom - collisionOffset > featherRect.top
    ) {
      return true;
    } else {
      return false;
    }
    }}
//***************************** */


// obstacles.js
class Obstacles {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.left = window.innerWidth; // Start from the right edge of the window
    // this.top = Math.floor(Math.random() * 300 + 70);
    this.top = Math.floor(Math.random() * 500 + 70);
    this.width = 400;
    this.height = 250;
    this.element = document.createElement("img");

    this.element.src = "images/airplane.png";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.right = `${this.right}px`
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;

    this.gameScreen.appendChild(this.element);
    console.log("obstacle position", this.element.getBoundingClientRect());
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
  }

  move() {
    
    console.log(this.gameScreen);
    this.left -= 5;

    if (this.left + this.width < 0) {
      this.left = window.innerWidth;
      this.top = Math.floor(Math.random() * 300 + 70);
    }

    this.updatePosition();
  }
}
class Feather{
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.left = window.innerWidth; // Start from the right edge of the window
    this.top = Math.floor(Math.random() * 500 + 70);
    
    this.width = 400;
    this.height = 250;
    this.element = document.createElement("img");

    this.element.src = "images/feather.png";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.right = `${this.right}px`;
    this.element.style.top = `${this.top}px`;


    this.gameScreen.appendChild(this.element);
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
  }

  move() {
    this.left -= 4;
    this.updatePosition();
    ///////
    this.top = Math.floor(Math.random() * 300 + 70);
  }
}

// game.js
class Game {
  constructor() {
    this.startScreen = document.getElementById('game-intro');
    this.gameScreen = document.getElementById('game-screen');
    this.gameEndScreen = document.getElementById('game-end');
    this.frames = 0;
    this.player = new Player(
      this.gameScreen,
      700,
      200,
      300, // Adjusted width for player
      196,  // Adjusted height for player
      './images/bird.png'
    );
    this.feather = [];
    this.obstacles = [];
    this.width = 1300;
    this.height = 690;
    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;
  }

  start() {
    this.gameScreen.style.width = `${this.width}px`;
    this.gameScreen.style.height = `${this.height}px`;
    this.startScreen.style.display = 'none';
    this.gameScreen.style.display = 'block';
    this.gameLoop();
  }


  gameLoop() {
    if (this.gameIsOver === true) {
      return;
    }

    this.update();
    window.requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    this.player.move();
    this.frames ++

    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();

      if (this.player.didCollide(obstacle)) {
        //***** */
        
        //********* */
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        this.lives--;
        document.getElementById("lives").textContent = this.lives;
        i--;
        console.log("didcollide obstacle is working")
      } else if (obstacle.left + obstacle.width < 0) {
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        i--;
      }
    }
    for (let i = 0; i < this.feather.length; i++) {
      const feather = this.feather[i];
      // is it ?//
      feather.move();

      if (this.player.didCollide(feather)) {
        feather.element.remove();
        this.feather.splice(i, 1);
        this.score++;
        document.getElementById("score").textContent = this.score;
        i++;
      } else if (feather.left + feather.width < 0) {
        feather.element.remove();
        this.feather.splice(i, 1);
        i++;
      }
    }

   
    
    if (Math.random() > 0.5 && this.obstacles.length < 3 && this.frames % 100 == 0) {
      this.obstacles.push(new Obstacles(this.gameScreen));
    }

    if (Math.random() > 0.5 && this.feather.length < 2 && this.frames % 100 == 0) {
      this.feather.push(new Feather(this.gameScreen));
    }

    if (this.lives === 0) {
      this.endGame();
    }
  }

  endGame() {
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => obstacle.element.remove());

    this.gameIsOver = true;

    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
  }
}


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
