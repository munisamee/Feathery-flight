class Feather{
    constructor(gameScreen) {
      this.gameScreen = gameScreen;
      this.left = window.innerWidth; // Start from the right edge of the window
      this.top = Math.floor(Math.random() * 500 + 70);
      
      this.width = 500;
      this.height = 350;
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
      this.left -= 5;
      this.updatePosition();
      ///////
      this.top = Math.floor(Math.random() * 300 + 70);
    }
  }