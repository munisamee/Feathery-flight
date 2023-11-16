class Obstacles {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.left = window.innerWidth; // Start from the right edge of the window
    this.top = Math.floor(Math.random() * 300 + 70);
    // this.top = 0;
    this.width = 300;
    this.height = 150;
    this.element = document.createElement("img");

    this.element.src = "images/airplane.png";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.right = `${this.right}px`;
    this.element.style.left = `${this.left}px`;

    this.gameScreen.appendChild(this.element);
  }

  updatePosition() {
    // Update the obstacle's position based on the properties left and top
    this.element.style.left = `${this.left}px`;
    console.log("obstacle position", this.element.getBoundingClientRect());
  }

  move() {
    // Move the obstacle horizontally from right to left
    this.left -= 3; //Adjust the speed as needed

    // // If the obstacle horizontally from right to left
    if (this.left + this.width < 0) {
      this.left = window.innerWidth;
      this.top = Math.floor(Math.random() * 300 + 70); // Reset the vertical position
    }
    //  Update the obstacle's position on the screen
    this.updatePosition();
  }
}
