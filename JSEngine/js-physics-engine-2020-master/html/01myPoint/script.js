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

function Spawn() {
  randomwidth = getRandomInt(250, width-250);
  randomheight = getRandomInt(250, height-250);
  color = getRandomColor();
  if (points.length <= 100) {
  points.push(new Point(new Vector2d(randomwidth, randomheight), 5, color, new Vector2d(getRandomInt(-25, 25)/10,getRandomInt(-25, 25)/10), getRandomInt(0, 500)));
  }
}

function Render() {
  context.clearRect(0, 0, width, height);
  for (let i = 0; i < points.length; i++)
  {
    points[i].moveSinus();
    points[i].draw(context);
  }
}

setInterval(Spawn, 50);
setInterval(Render, 10);
// begin hier met jouw code voor deze opdracht
