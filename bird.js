


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