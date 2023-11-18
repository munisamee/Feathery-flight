class Game {
    constructor() {
      this.startScreen = document.getElementById('game-intro');
      this.gameScreen = document.getElementById('game-screen');
      this.gameEndScreen = document.getElementById('game-end');
      this.frames = 0;
      this.player = new Player(
        this.gameScreen,
        900,
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
  
      if (Math.random() > 0.5 && this.feather.length < 3 && this.frames % 100 == 0) {
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