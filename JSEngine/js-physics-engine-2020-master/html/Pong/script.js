const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let randomwidth = getRandomInt(0, width);
let randomheight = getRandomInt(0, height);
let color = "#006666";

let bats = [];
let player1 = true;
let player2 = false;

let score1 = 0;
let score2 = 0;

let paddleLength = 250;
let paddleLength2 = 250;

let y = height/2;
let y2 = height/2;
let x = height/2;
let x2 = height/2;
let points = [];

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
    /*for (let i2 = i+1; i2 < points.length; i2++)
    {
    let res1 = -GetSlope(points[i].pos, points[i2].pos);
    let res2 = -Evaluate(0, res1 * points[i].pos.dx - points[i].pos.dy);

    context.beginPath();
    context.moveTo(0, res2);
    context.lineTo(width, width*res1 + res2);
    context.strokeStyle = "#009999";
    context.stroke();
    }*/

    bats[0].move(moveVector.dy, points.length-1);
    bats[1].move2(moveVector2.dy, points.length-1);
    bats[2].move3(moveVector.dx, points.length-1);
    bats[3].move4(moveVector2.dx, points.length-1);

    points[i].moveSinus();
    if(points[i].testCollision(bats[0].pos.dx, bats[0].pos.dx + bats[0].size.dx, bats[0].pos.dy, bats[0].pos.dy + bats[0].size.dy)) points[i].ChangeDirectionX(true);
    if(points[i].testCollision(bats[1].pos.dx, bats[1].pos.dx + bats[1].size.dx, bats[1].pos.dy, bats[1].pos.dy + bats[1].size.dy)) points[i].ChangeDirectionX(false);
    if(points[i].testCollision(bats[2].pos.dx, bats[2].pos.dx + bats[2].size.dx, bats[2].pos.dy, bats[2].pos.dy + bats[2].size.dy)) points[i].ChangeDirectionY(true);
    if(points[i].testCollision(bats[3].pos.dx, bats[3].pos.dx + bats[3].size.dx, bats[3].pos.dy, bats[3].pos.dy + bats[3].size.dy)) points[i].ChangeDirectionY(false);
    points[i].draw(context);
    points[i].drawVelocity(context);
    //context.beginPath();
    //context.moveTo(points[0].pos.dx, points[0].pos.dy);
    //for (let i = 0; i < points.length; i++) {
    //context.lineTo(points[i].pos.dx, points[i].pos.dy);
    //}
    //context.lineTo(points[0].pos.dx, points[0].pos.dy);
    //context.strokeStyle = "#ff0000";
    //context.stroke();

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
Spawn();
Spawn();
Spawn();
Spawn();
Spawn();
Spawn();
Spawn("#ff0000");
setInterval(Render, 10);
// begin hier met jouw code voor deze opdracht
