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

let circleObject = {};
circleObject.x = 300;
circleObject.y = 300;
circleObject.radius = 60;

circleObject.draw = function(){
  context.beginPath();
  context.lineWidth = 10;
  context.fillStyle = "yellow";
  context.arc(circleObject.x, circleObject.y, circleObject.radius, 0, 2*Math.PI);
  context.closePath();
  context.stroke();
  context.fill();
}

let circleObject2 = {};
circleObject2.x = 300;
circleObject2.y = 300;
circleObject2.dx = 0;
circleObject2.dy = 0;
circleObject2.radius = 60;

circleObject2.draw = function(){
  if( x<0 || x>width) dx=-dx;
  if( y<0 || y>height) dy=-dy;
  x+=dx;
  y+=dy;
  context.beginPath();
  context.lineWidth = 10;
  context.fillStyle = "yellow";
  context.arc(circleObject2.x, circleObject2.y, circleObject2.radius, 0, 2*Math.PI);
  context.closePath();
  context.stroke();
  context.fill();
}

// hier kun je op de canvas tekenen
spawnCircle();
let circle = {};
let circles = [];
var whiteColors = ["#999999", "#888888", "#777777", "#666666", "#555555", "#444444", "#333333", "#222222", "#111111", "#000000", "#aaaaaa", "#bbbbbb", "#cccccc", "#dddddd", "#eeeeee", "#ffffff"];
var rdx = Math.floor(Math.random() * 1536);
var rdy = Math.floor(Math.random() * 754);
var rdc = Math.floor(Math.random() * 16);
var rda = Math.floor(Math.random() * 100);
var rdb = Math.floor(Math.random() * 3.14);
var rdd = Math.floor(Math.random() * 2);
var rde = Math.floor(Math.random() * 2);
var color = whiteColors[rdc];
var x = -50;
var y = -50;

function spawnCircle() {
  setTimeout(function() {

    if (attempts == 200) {
      whiteColors = ["#999999", "#888888", "#777777", "#666666", "#555555", "#444444", "#333333", "#222222", "#111111", "#000000", "#aaaaaa", "#bbbbbb", "#cccccc", "#dddddd", "#eeeeee", "#ffffff"];
      circle.rdx = Math.floor(Math.random() * 1336 + 200);
      circle.rdy = Math.floor(Math.random() * 754 + 100);
      circle.rdc = Math.floor(Math.random() * 16);
      circle.rda = Math.floor(Math.random() * 70) + 100;
      circle.rdb = Math.floor(Math.random() * 3.14);
      circle.rdd = Math.floor(Math.random() * 10)-5;
      circle.rde = Math.floor(Math.random() * 10)-5;
      circle.color = whiteColors[rdc];
      erasing = false;
      circle.startAngle = 1.5 * mathPi;
      circle.endAngle = 1.5 * mathPi;
      attempts = 0;
      circles.push(circle);
    }


    if (erasing) {
      circle.startAngle = circle.startAngle + 0.01 * mathPi;
      circle.rda = circle.rda * 1.005;
      circle.rdx = circle.rdx + circle.rdd/5;
      circle.rdy = circle.rdy + circle.rde/5;
      circle.color = whiteColors[Math.floor(Math.random() * 3)+circle.rdc-3];
    } else {
      circle.endAngle = circle.endAngle + 0.01 * mathPi;
      circle.rda = circle.rda / 1.005;
      circle.rdx = circle.rdx + circle.rdd/5;
      circle.rdy = circle.rdy + circle.rde/5;
      circle.color = whiteColors[Math.floor(Math.random() * 4)+circle.rdc-3];
    }

    if (endAngle > (1.5 * mathPi)) {
      erasing = true;
    }
    if (startAngle > (1.5 * mathPi)) {
      erasing = false;
    }

    context.clearRect(0,0,width,height);

    context.beginPath()
    context.lineWidth = circle.rdb;
    context.fillStyle = circle.color;
    context.arc(circle.rdx, circle.rdy, circle.rda, circle.startAngle, circle.endAngle, false);
    context.stroke();
    context.fill();
    attempts = attempts + 1;
    spawnCircle();

    x = x + 1;
    y = y + 1;
    circleObject.x = 1500+100*Math.sin(Math.sin(x-x*x)/25)+1000*Math.sin(x/250);
    circleObject.y = 1000+Math.cos(y/100)+100*Math.sin(y/25)*(Math.sin(Math.cos(y*y/250)));
    circleObject.y = circleObject.y + 250*Math.sin(y/100);
    circleObject.draw();

    circleObject2.x = x*10;
    circleObject2.y = y*10;
    if(circleObject2.x <= 0){
    circleObject2.x = x*10;}
    if(circleObject2.y <= 0){
    circleObject2.y = y*10;}
    if(circleObject2.y >= height){
    circleObject2.y = y*-10;}
    if(circleObject2.x >= width){
    circleObject2.x = x*-10;}
    circleObject2.draw();
  }, 1);
}
