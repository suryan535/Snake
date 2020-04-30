const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

let score = 0;
const foodImg = new Image();
foodImg.src = "food.jpg";

const ground = new Image();
ground.src = "background.jpg";

const box = 32;
let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

//Keypress

document.addEventListener("keydown", direction);

let d;

function direction(event) {
  if (event.keyCode == 37 && d != "RIGHT") {
    d = "LEFT";
  } else if (event.keyCode == 38 && d != "DOWN") {
    d = "UP";
  }
  else if (event.keyCode == 39 && d != "LEFT") {
    d = "RIGHT";
  }
  else if (event.keyCode == 40 && d != "UP") {
    d = "DOWN";
  }
}

//Swipes 
let touchStartX;
let touchEndX;
let touchStartY;
let touchEndY;

document.addEventListener('touchstart', function (event) {
  touchStartX = event.screenX;
  touchStartY = event.screenY;
  event.preventDefault();
});

document.addEventListener('touchend', function (event) {
  touchEndX = event.screenX;
  touchEndY = event.screenY;
  event.preventDefault();
  swipedirection();
});

function swipedirection() {
  if ((touchEndX > touchStartX) && d != "LEFT") {
    d = "RIGHT";
  }
  else if ((touchEndY > touchStartY) && d != "UP") {
    d = "DOWN";
  }
  else if ((touchEndX < touchStartX) && d != "RIGHT") {
    d = "LEFT";
  }
  else if ((touchEndY < touchStartY) && d != "DOWN") {
    d = "UP";
  }
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}


function draw() {

  ctx.drawImage(ground, 0, 0);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = (i == 0) ? "red" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = "blue";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.drawImage(foodImg, food.x, food.y);

  //Getting old headp pos

  let SnakeX = snake[0].x;
  let SnakeY = snake[0].y;


  if (d == "LEFT") SnakeX -= box;
  if (d == "RIGHT") SnakeX += box;
  if (d == "DOWN") SnakeY += box;
  if (d == "UP") SnakeY -= box;


  if (SnakeX == food.x && SnakeY == food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box
    };

  }
  else {
    snake.pop();
  }

  let newHead =
  {
    x: SnakeX,
    y: SnakeY
  };


  //Game End
  if (SnakeX < box || SnakeX > 20 * box || SnakeY < 3 * box || SnakeY > 20 * box || collision(newHead, snake)) {
    clearInterval(game);
  }



  snake.unshift(newHead);

  ctx.fillStyle = "white";
  ctx.font = "45px Changa one";
  ctx.fillText(score, 2 * box, 1.6 * box);
}

let game = setInterval(draw, 100);
