const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

let score = 0;

let speed = 100;

const box = 32;
let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

let food = {
  x: 5 * box,
  y: 14 * box,
};

//Obstacle

let obstacle = [];
obstacle[0] =
{
  x: 6 * box,
  y: 7 * box,
};
for (let i = 0; i < 6; i++) {
  obstacle[i] =
  {
    x: (6 + i) * box,
    y: 7 * box,
  };
}

for (let i = 6; i < 10; i++) {
  obstacle[i] =
  {
    x: 11 * box,
    y: (13 - i) * box,
  };
}

for (let i = 0; i < 5; i++) {
  obstacle[i + 10] =
  {
    x: 15 * box,
    y: (12 + i) * box,

  };
}

for (let i = 0; i < 5; i++) {
  obstacle[i + 14] =
  {
    x: (15 - i) * box,
    y: 16 * box,
  };
}

function obstacleclear(head, array) {
  for (let i = 0; i < obstacle.length; i++) {
    if (obstacle[i].x == head.x && obstacle[i].y == head.y) {
      return true;
    }
  }
  return false;
}

function random() {
  obstacle = [];
  for (let i = 0; i < 10; i++) {
    obstacle[i] =
    {
      x: Math.floor(Math.random() * 20 + 1) * box,
      y: Math.floor(Math.random() * 20 + 1) * box,
    }
  }
}

//food Clear

function foodclear() {
  for (let i = 0; i < obstacle.length; i++) {
    if (obstacle[i].x == food.x && obstacle[i].y == food.y) {
      return true;
    }
  }
  return false;
}
//SPeed control

function speedup() {
  speed = speed - 30;
}
function speeddown() {
  speed = speed + 30;
}

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

//BUTTON Responses
function turntop() {
  if (d != "DOWN") {
    d = "UP";
  }
}
function turnleft() {
  if (d != "RIGHT") {
    d = "LEFT";
  }
}
function turnright() {
  if (d != "LEFT") {
    d = "RIGHT";
  }
}
function turndown() {
  if (d != "TOP") {
    d = "DOWN";
  }
}

//Swipes 
var touchStartX;
var touchEndX;
var touchStartY;
var touchEndY;

document.addEventListener('touchstart', function (event) {
  touchstartX = event.screenX;
  touchStartY = event.screenY;
});

document.addEventListener('touchend', function (event) {
  touchEndX = event.screenX;
  touchEndY = event.screenY;
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

  ctx.fillStyle = "lightblue";
  ctx.fillRect(0, 0, 680, 680);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = (i == 0) ? "red" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = "blue";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  //Obstacles
  for (let i = 0; i < obstacle.length; i++) {
    ctx.fillStyle = "black";
    ctx.fillRect(obstacle[i].x, obstacle[i].y, box, box);
  }

  ctx.fillStyle = "blue";
  ctx.fillRect(food.x, food.y, box, box);

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
      x: Math.floor(Math.random() * 20 + 1) * box,
      y: Math.floor(Math.random() * 20 + 1) * box
    };
    while (foodclear()) {
      food = {
        x: Math.floor(Math.random() * 20 + 1) * box,
        y: Math.floor(Math.random() * 20 + 1) * box
      };
    }

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
  if (SnakeX < 0 || SnakeX > 680 || SnakeY < 0 || SnakeY > 680 || collision(newHead, snake) || obstacleclear(newHead, snake)) {
    clearInterval(game);
  }



  snake.unshift(newHead);

  ctx.fillStyle = "black";
  ctx.font = "50px Changa one";
  ctx.fillText(score, 0.6 * box, 1.3 * box);
}

let game = setInterval(draw, speed);

