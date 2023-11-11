let board;
let boardWidth = 1300;
let boardHeight = 690;
let context;


let velocityY = 0;
//Ensures the function gets executed after that the image has loaded
window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    // this is done for drqwing 2D in the canvas
    context = board.getContext("2d");

    // load image
    //TO BE CHECKED
    birdImg = new Image();
    birdImg.src = "./images/bird.png";
    birdImg.onload = function () {
        // console.log("Image loaded!"); "used to ensure the function is being called"  "
        // context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

        // Start the animation loop after the image is loaded
        requestAnimationFrame(update);
    };
  document.addEventListener("keydown", moveBird) 
}

function update() {
    requestAnimationFrame(update);
    // update the position of the bird
    bird.y += velocityY;
    // ensure the bird doesn't get out of the page
    bird.y = Math.max(0, Math.min(bird.y, board.height - bird.height));
    //: to be checked.
    context.clearRect(0, 0, board.width, board.height);

    // Draw the image
    
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    
    
    
   
}
//to move the bird up and down
function moveBird(e) {
    if (e.code === "ArrowUp"){
        velocityY = -5;
    }
    else if (e.code === "ArrowDown"){
        velocityY = 5;
    }
}