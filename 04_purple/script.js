// Get canvas from HTML.
const canvas = document.getElementById('canvas');

// Get a 2d contect on the canvas.
const context = canvas.getContext('2d');

// --- Declare Data ---
// Declase constants.
let attempts = 0;
let mathPi = Math.PI;
let erasing = false;
let startAngle = 1.5 * mathPi;
let endAngle = 1.5 * mathPi;

// Declare Screen Size.
const width = window.innerWidth;
const height = window.innerHeight;
canvas.width = width;
canvas.height = height;

// Declare Variables
let x = 100;
let y = 200;
let dx = 100;
let dy = 100;
let z = 0;
let whiteColors = ["#720b98", "#6f2da8", "#8601af", "#5b0a91", "#6d00c1", "#6a0dad", "#671d9d", "#9621d9", "#550a8a", "#8741bb", "#a167c9", "#ba8cd7", "#d2b2e5", "#59128e", "#481470", "#381354"];
let a = Math.floor(Math.random() * 16);
let b = 50;

circleObject = {};
let circles = [];

function init() {
  // Initialize a new circle object with function Circle
  circles.push(new circle());
}

function circle() {
  //Randomize Circle Data on creation
  this.x = Math.floor(Math.random() * width / 2) + Math.floor(Math.random() * width / 2);
  this.y = Math.floor(Math.random() * height / 2) + Math.floor(Math.random() * width / 2);
  this.dx = Math.floor(Math.random() * 16) - 16;
  this.dy = Math.floor(Math.random() * 16) - 16;
  this.a = Math.floor(Math.random() * 16);
  this.b = Math.floor(Math.random() * 40) + 30;
  this.z = 0;

  this.draw = function() {
    // Drawing the instance of Circle
    context.beginPath();
    context.fillStyle = whiteColors[this.a];
    context.arc(this.x, this.y, this.b, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();

    // --- Sinus Movement Logic ---
    this.z++;
    this.dx += (Math.sin(this.z / 100)) + (Math.cos(this.z / 250));
    this.dy += (Math.sin(this.z / 150)) + (Math.cos(this.z / 200));
    this.b += (1 * Math.sin(this.z / 20));

    // --- Boundary Logic ---
    // change colors every z % 100 == 0, then if you reach the end of the color array, reset the color index.
    if (this.z % 100 == 0) this.a++;
    if (this.a > whiteColors.length) this.a = 0;
    // If the position is outside of the bounds, flip the velocity. The bounds are made smaller equal to the radius of the circle.
    if (this.x < this.b || this.x > width - this.b) this.dx = -this.dx;
    if (this.y < this.b || this.y > height - this.b) this.dy = -this.dy;
    this.x += this.dx;
    this.y += this.dy;
  }
}

// Execute the primary functions
DoThis();
animate();

// DrawFunction is responsible for drawing each circle in the array of circles, after they are initialized in the function DoThis
function drawfunction() {
  context.clearRect(0, 0, width, height);
  for (let i = 0; i < circles.length; i++) {
    circles[i].draw();
  }
}

// DoThis allows me to easily create more circles. it will create i < x circles, since for each instance of Init, a circle is created.
function DoThis() {
  for (let i = 0; i < 100; i++) {
    init();
  }
}

// Animate animates the circles every (drawfunction, x) frames. Higher frame counts means the animation is played slower.
function animate() {
  setInterval(drawfunction, 25);
}
