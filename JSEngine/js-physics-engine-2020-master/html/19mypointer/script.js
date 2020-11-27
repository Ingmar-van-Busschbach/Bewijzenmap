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
let mouseX;
let mouseY;
let mousePressed = false;
let pointPressed = -1;
let arrow;



this.addEventListener("mousedown", function(e) {
  mousePressed=true;
  for (let i = 0; i < points.length; i++) {
    if (points[i].testCollision(mouseX, mouseX, mouseY, mouseY)) {
      pointPressed = i;
    }
  }
  for (let i = 0; i < interceptionPoints.length; i++) {
    if (interceptionPoints[i].testCollision(mouseX, mouseX, mouseY, mouseY)) {
      console.log(interceptionPoints[i]);
      console.log(i);
    }
  }
});
this.addEventListener("mouseup", function(e) {
  mousePressed = false;
  pointPressed = -1;
});
this.addEventListener("mouseout", function(e) {
  mousePressed = false;
  pointPressed = -1;
});

this.addEventListener('mousemove', function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if(mousePressed && pointPressed != -1) {
    points[pointPressed].Drag();
    console.log(pointPressed);
}
});

function Spawn(color = "#ffffff") {
  randomwidth = getRandomInt(250, width-250);
  randomheight = getRandomInt(250, height-250);
  points.push(new Point(new Vector2d(randomwidth, randomheight), 10, color, new Vector2d(getRandomInt(-25, 25)/10,getRandomInt(-25, 25)/10), getRandomInt(0, 500)));
}

function GenerateLines() {
  GenerateMathLineFromPoints(points[0].pos, points[1].pos);
  GenerateMathLineFromPoints(points[0].pos, new Vector2d(points[0].pos.x + 200, points[0].pos.y));
  GenerateAngleCircle(points[0], mathlines[0], mathlines[1], 50);
  arrow = new Arrow(points[0].pos, new Vector2d(100,15), new Vector2d(25,35));
}

function Render() {
  context.clearRect(0, 0, width, height);
  points[0].draw(context);
  points[1].draw(context);
  mathlines[0].ReEvaluate(points[0].pos, points[1].pos);
  mathlines[0].draw(context);
  mathlines[1].ReEvaluate(points[0].pos, new Vector2d(points[0].pos.x + 200, points[0].pos.y));
  mathlines[1].draw(context);
  angleCircles[0].ReEvaluate(points[0].pos, mathlines[0], mathlines[1]);
  angleCircles[0].draw(context);
  arrow.ReEvaluate(points[0].pos,points[1].pos);
  arrow.animate(context);
}
Spawn(GetRainbowColor(points.length));
Spawn(GetRainbowColor(points.length));
GenerateLines();
setInterval(Render, 1);
