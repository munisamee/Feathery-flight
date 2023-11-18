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
      this.left -= 7;
  
      if (this.left + this.width < 0) {
        this.left = window.innerWidth;
        this.top = Math.floor(Math.random() * 300 + 70);
      }
  
      this.updatePosition();
    }
  }
  