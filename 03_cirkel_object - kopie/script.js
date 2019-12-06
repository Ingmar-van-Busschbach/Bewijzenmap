// maak een variabele voor de canvas
const canvas = document.getElementById('canvas');

// leg een 2d-context over de canvas
const context = canvas.getContext('2d');

var attempts = 0;
var mathPi = Math.PI;
var erasing = false;
var startAngle = 1.5 * mathPi;
var endAngle = 1.5 * mathPi;
//maak de canvas schermvullend
const width = window.innerWidth;
const height = window.innerHeight;
canvas.width = width;
canvas.height = height;

var x=100;
var y=200;
var dx=100;
var dy=100;
var z=0;

circleObject = {};
let circles = [];

function init()
{
  circles.push(new circle());
}

function circle() {
  this.x=Math.floor(Math.random() * width/2) + width/2;
  this.y=Math.floor(Math.random() * height/2) + height/2;
  this.dx=Math.floor(Math.random() * 10)-5;
  this.dy=Math.floor(Math.random() * 10)-5;
  this.z=0;

  this.draw = function()
  {
    context.beginPath();
    context.fillStyle="#0000ff";
    // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
    context.arc(this.x,this.y,100,0,Math.PI*2,true);
    context.closePath();
    context.fill();
    // Boundary Logic
    this.z++;
    this.dx+=(7*Math.sin(this.z/100))+(7*Math.cos(this.z/250));
    this.dy+=(7*Math.sin(this.z/100))+(7*Math.cos(this.z/250));
  if( this.x<100 || this.x>width-100) this.dx=-this.dx;
  if( this.y<100 || this.y>height-100) this.dy=-this.dy;
  this.x+=this.dx;
  this.y+=this.dy;
  }
}

init();
init();
init();
init();
init();
init();
init();
init();
init();
init();
init();
init();
init();
init();
init();
init();
init();
init();
init();
init();
init();
init();
init();
init();
init();
random();

function drawfunction() {
  context.clearRect(0,0, width,height);
  for (var i = 0; i < circles.length; i++)
  {
    circles[i].draw();
  }
}

function random()
{
  setInterval(drawfunction,10);
}
