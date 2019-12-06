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

// hier kun je op de canvas tekenen
spawnCircle();
let circle = {};
let circles = [];
var whiteColors = ["#999999", "#888888", "#777777", "#666666", "#555555", "#444444", "#333333", "#222222", "#111111", "#000000", "#aaaaaa", "#bbbbbb", "#cccccc", "#dddddd", "#eeeeee", "#ffffff"];
var rdx = Math.floor(Math.random() * 1536);
var rdy = Math.floor(Math.random() * 754);
var rdc = Math.floor(Math.random() * 16);
var rda = Math.floor(Math.random() * 50);
var rdb = Math.floor(Math.random() * 3.14);
var rdd = Math.floor(Math.random() * 2);
var rde = Math.floor(Math.random() * 2);
var color = whiteColors[rdc];

function spawnCircle() {
  setTimeout(function() {

    if (attempts == 200) {
      whiteColors = ["#999999", "#888888", "#777777", "#666666", "#555555", "#444444", "#333333", "#222222", "#111111", "#000000", "#aaaaaa", "#bbbbbb", "#cccccc", "#dddddd", "#eeeeee", "#ffffff"];
      circle.rdx = Math.floor(Math.random() * 1136 + 200);
      circle.rdy = Math.floor(Math.random() * 554 + 100);
      circle.rdc = Math.floor(Math.random() * 16);
      circle.rda = Math.floor(Math.random() * 35) + 50;
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

    context.beginPath()
    context.lineWidth = circle.rdb;
    context.fillStyle = circle.color;
    context.arc(circle.rdx, circle.rdy, circle.rda, circle.startAngle, circle.endAngle, false);
    context.stroke();
    context.fill();
    attempts = attempts + 1;
    spawnCircle();
  }, 1);
}
