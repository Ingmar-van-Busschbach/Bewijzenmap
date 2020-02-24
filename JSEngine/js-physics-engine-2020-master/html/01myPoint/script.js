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
let player2 = true;

let paddleLength = 150;
let y = height/2;
let y2 = height/2;
let x = height/2;
let x2 = height/2;

function Spawn() {
  randomwidth = getRandomInt(250, width-250);
  randomheight = getRandomInt(250, height-250);
  color = getRandomColor();
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
  }
}

bats.push(new PongBat(new Vector2d(10, paddleLength), new Vector2d(paddleLength/10,paddleLength), getRandomColor()));
bats.push(new PongBat(new Vector2d(width-(10+paddleLength/10), paddleLength), new Vector2d(paddleLength/10,paddleLength), getRandomColor()));
bats.push(new PongBat(new Vector2d(paddleLength, 10), new Vector2d(paddleLength,paddleLength/10), getRandomColor()));
bats.push(new PongBat(new Vector2d(paddleLength, height-(10+paddleLength/10)), new Vector2d(paddleLength,paddleLength/10), getRandomColor()));

//setInterval(Spawn, 50);
Spawn();
setInterval(Render, 10);
// begin hier met jouw code voor deze opdracht
