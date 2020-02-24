// Get canvas from HTML.
const canvas = document.getElementById('canvas');

// Get a 2d contect on the canvas.
const context = canvas.getContext('2d');

// --- Declare Data ---
// Declare Screen Size.
const width = window.innerWidth;
const height = window.innerHeight;
canvas.width = width;
canvas.height = height;

//stats
let enemySpeed = 11;
let ballStartSpeed = 20;
let ballSpeedUpModifier = 1.001;
let paddleLength = 150;
let paddleSpeed = 40;
let ballSize = 25;
let ballBounceModifier = 1.00;
let ballWave = false;
let mouseControl = false;
let player2 = true;

if (mouseControl == true) player2 = false;

// Declare Variables
let y = height / 2;
let player2Y = height / 2;
let enemyY = height / 2;
let sizex = 0;
let sizey = 0;
let yposition = 0;

let moveUp = false;
let moveDown = false;
let moveUp2 = false;
let moveDown2 = false;
let i = 0;

let scorePlayer = 0;
let scoreEnemy = 0;

let circles = [];
let bats = [];

document.addEventListener('mousemove', function(input) {
  if (mouseControl == true) y = input.pageY;;
});

document.addEventListener('keydown', function(event) {
  // settings changer
  if (mouseControl == false) {
    if (event.keyCode == 87) {
      console.log(event.keyCode);
      moveDown = false;
      moveUp = true;
    }
    if (event.keyCode == 83) {
      console.log(event.keyCode);
      moveUp = false;
      moveDown = true;
    }
    if (event.keyCode == 38) {
      console.log(event.keyCode);
      moveDown2 = false;
      moveUp2 = true;
    }
    if (event.keyCode == 40) {
      console.log(event.keyCode);
      moveUp2 = false;
      moveDown2 = true;
    }
  }
});

function circle() {
  //Randomize Circle Data on creation
  this.size = ballSize;
  this.x = width / 2;
  this.y = height / 2;
  this.z = Math.floor(Math.random() * 1000);
  this.kill = false;
  this.dx = ballStartSpeed;
  if (scorePlayer > scoreEnemy) this.dx = -ballStartSpeed;
  if (scorePlayer < scoreEnemy) this.dx = ballStartSpeed;
  this.dy = Math.floor(Math.random() * ballStartSpeed) - ballStartSpeed * 2;
  if (this.dy == 0) this.dy = ballStartSpeed;

  this.draw = function() {
    // Drawing the instance of Circle
    context.beginPath();
    context.fillStyle = "#ffffff";
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();

    if(ballWave==true)
    {
    this.z++;
    this.dx += (3* Math.sin(this.z / 10)) + (3* Math.cos(this.z / 10)) / 1000;
    this.dy += (3* Math.sin(this.z / 10)) + (3* Math.cos(this.z / 10)) / 1000;
    if(this.dx > 50) this.dx = 50;
    if(this.dy > 50) this.dy = 50;
    }

    this.dx = this.dx * ballSpeedUpModifier;
    this.dy = this.dy * ballSpeedUpModifier;

    // --- Boundary Logic ---
    // If the position is outside of the bounds, flip the velocity. The bounds are made smaller equal to the radius of the circle.
    if (this.x < this.size && this.kill == false) {
      this.kill = true;
      circles.push(new circle());
      scoreEnemy++;
    }

    if (this.x > width - this.size && this.kill == false) {
      this.kill = true;
      circles.push(new circle());
      scorePlayer++;
    }

    // Bat Collission
    if (this.x + this.size > bats[0].xposition && this.x - this.size < bats[0].xposition + bats[0].sizex && this.y + this.size > y && this.y - this.size < y + bats[0].sizey) {
      this.dy = (this.y - (y + (paddleLength / 2))) / (ballBounceModifier * 5);
      this.dx = Math.sqrt(this.dx * this.dx);
    }
    if (this.x + this.size > bats[1].xposition && this.x - this.size < bats[1].xposition + bats[1].sizex && this.y + this.size > enemyY && this.y - this.size < enemyY + bats[1].sizey) {
      this.dy = (this.y - (enemyY + (paddleLength / 2) + enemySpeed)) / (ballBounceModifier * 5);
      this.dx = Math.sqrt(this.dx * this.dx) * -1;
    }

    if (this.y < this.size || this.y > height - this.size) this.dy = -this.dy;
    this.x += this.dx;
    this.y += this.dy;
  }
}

function bat(xlocation) {
  this.xposition = xlocation;
  this.sizex = paddleLength / 6;
  this.sizey = paddleLength;
  this.drawbat = function(yposition) {
    // Drawing the instance of Circle
    context.beginPath();
    context.fillStyle = "#ffffff";
    context.rect(this.xposition, yposition, this.sizex, this.sizey);
    context.closePath();
    context.fill();
  }
  this.drawenemybat = function(yposition) {
    // Drawing the instance of Circle
    if (player2 == false) {
      if (yposition > enemyY) enemyY += enemySpeed;
      if (yposition < enemyY) enemyY -= enemySpeed;
    }
    if (player2 == true) enemyY = yposition;

    context.beginPath();
    context.fillStyle = "#ffffff";
    context.rect(this.xposition, enemyY, this.sizex, this.sizey);
    context.closePath();
    context.fill();
  }
}

// Execute the primary functions
initiate();
animate();

// DoThis allows me to easily create more circles. it will create i < x circles, since for each instance of Init, a circle is created.
function initiate() {
  bats.push(new bat(100));
  bats.push(new bat(width - 100));
  circles.push(new circle());
}

// Animate animates the circles every (drawfunction, x) frames. Higher frame counts means the animation is played slower.
function animate() {
  setInterval(drawfunction, 16);
}

// DrawFunction is responsible for drawing each circle in the array of circles, after they are initialized in the function DoThis
function drawfunction() {
  context.clearRect(0, 0, width, height);

  if (player2 == false) player2Y = circles[i].y - (paddleLength / 2);
  i = circles.length - 1;
  if (moveUp == true && y > 0) y -= paddleSpeed;
  if (moveDown == true && y < height - paddleLength) y += paddleSpeed;
  if (moveUp2 == true && player2Y > 0) player2Y -= paddleSpeed;
  if (moveDown2 == true && player2Y < height - paddleLength) player2Y += paddleSpeed;

  if (player2 == false) player2Y = points[i].y - (paddleLength / 2);
  if (moveUp == true && y > 0) y -= paddleSpeed;
  if (moveDown == true && y < height - paddleLength) y += paddleSpeed;
  if (moveUp2 == true && player2Y > 0) player2Y -= paddleSpeed;
  if (moveDown2 == true && player2Y < height - paddleLength) player2Y += paddleSpeed;

  bats[0].drawbat(y);
  circles[i].draw();
  bats[1].drawenemybat(player2Y);

  context.beginPath();
  context.font = "100px Arial";
  context.fillStyle = "#ffffff";
  context.fillText(scorePlayer + "-" + scoreEnemy, width / 2 - 100, height / 2);
  context.closePath();
}
