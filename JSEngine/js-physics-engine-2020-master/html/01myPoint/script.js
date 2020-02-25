const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let randomwidth = getRandomInt(0, width);
let randomheight = getRandomInt(0, height);
let color = "#006666";

let points = [];
let bats = [];
let player1 = false;
let player2 = false;

let score1 = 0;
let score2 = 0;

let paddleLength = 25;
let paddleLength2 = 25;

let y = height/2;
let y2 = height/2;
let x = height/2;
let x2 = height/2;

function Spawn(color2 = "#ffffff") {
  randomwidth = getRandomInt(250, width-250);
  randomheight = getRandomInt(250, height-250);
  color = color2;
  if (points.length <= 100) {
  points.push(new Point(new Vector2d(randomwidth, randomheight), 15, color, new Vector2d(getRandomInt(-25, 25)/10,getRandomInt(-25, 25)/10), getRandomInt(0, 500)));
  }
}

function Render() {
  context.clearRect(0, 0, width, height);
  for (let i = 0; i < points.length; i++)
  {
    bats[0].move(moveUp, moveDown, points.length-1);
    bats[1].move2(moveUp2, moveDown2, points.length-1);
    bats[2].move3(moveLeft, moveRight, points.length-1);
    bats[3].move4(moveLeft2, moveRight2, points.length-1);

    points[i].moveSinus();
    points[i].testCollision();
    points[i].draw(context);

    context.beginPath();
    context.font = "100px Arial";
    context.fillStyle = "#ffffff";
    context.fillText(score1 + "-" + score2, width / 2 - 100, height / 2);
    context.closePath();
  }
}

bats.push(new PongBat(new Vector2d(10, paddleLength), new Vector2d(paddleLength/10,paddleLength), "#ffffff"));
bats.push(new PongBat(new Vector2d(width-(10+paddleLength2/10), paddleLength2), new Vector2d(paddleLength2/10,paddleLength2), "#ffffff"));
bats.push(new PongBat(new Vector2d(paddleLength, 10), new Vector2d(paddleLength,paddleLength/10), "#ffffff"));
bats.push(new PongBat(new Vector2d(paddleLength2, height-(10+paddleLength2/10)), new Vector2d(paddleLength2,paddleLength2/10), "#ffffff"));

document.addEventListener('keydown', function(event) {
if (event.keyCode == 32) {
  console.log(event.keyCode);
  Spawn();
}
if (event.keyCode == 49) {
  console.log(event.keyCode);
  key1 = true;
  if (player1 == false) player1 = true;
  if (player1 == true) player1 = false;
}
if (event.keyCode == 50) {
  console.log(event.keyCode);
  key2 = true;
  if (player2 == false) player2 = true;
  if (player2 == true) player2 = false;
}
if (event.keyCode == 51) {
  console.log(event.keyCode);
  key3 = true;
}
if (event.keyCode == 52) {
  console.log(event.keyCode);
  key4 = true;
}
if (event.keyCode == 53) {
  console.log(event.keyCode);
  key5 = true;
}
});

//setInterval(Spawn, 50);
Spawn();
Spawn();
Spawn();
Spawn("#ff0000");
setInterval(Render, 10);
// begin hier met jouw code voor deze opdracht
