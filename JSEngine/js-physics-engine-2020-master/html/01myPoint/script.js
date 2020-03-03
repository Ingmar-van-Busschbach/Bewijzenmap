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

this.addEventListener("mousedown", function(e) {
  mousePressed=true;
  for (let i = 0; i < points.length; i++) {
    if (points[i].testCollision(mouseX, mouseX, mouseY, mouseY)) {
      pointPressed = i;
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
}
});

function Spawn(color = "#ffffff") {
  randomwidth = getRandomInt(250, width-250);
  randomheight = getRandomInt(250, height-250);
  if (points.length <= 100) {
  points.push(new Point(new Vector2d(randomwidth, randomheight), 15, color, new Vector2d(getRandomInt(-25, 25)/10,getRandomInt(-25, 25)/10), getRandomInt(0, 500)));
  }
}

function Render() {
  context.clearRect(0, 0, width, height);
  for (let i = 0; i < points.length; i++)
  {
    for (let i2 = i+1; i2 < points.length; i2++)
    {
    mathlines[i2].ReEvaluate(points[i].pos, points[i2].pos);

    let i3;
    if (i == 0 && i2 == 1) i3 = 2;
    if (i == 0 && i2 == 2) i3 = 1;
    if (i == 1 && i2 == 2) i3 = 0;


    let position3 = new Vector2d((points[i].pos.dx - points[i2].pos.dx)/2+points[i2].pos.dx, (points[i].pos.dy - points[i2].pos.dy)/2+points[i2].pos.dy);
    weightlines[i2].ReEvaluate(points[i3].pos, position3);

    mathlines[i2].draw(context);
    weightlines[i2].draw(context);
    for (i4 = 0; i4 < interceptionPoints.length; i4++){
    interceptionPoints[0].ReEvaluate(weightlines[i].a, weightlines[i2].a, weightlines[i].b, weightlines[i2].b);
    interceptionPoints[i4].draw(context);}
    }
    points[i].draw(context);
  }
}
function GenerateLines() {
  for (let i = 0; i < points.length; i++)
  {
    for (let i2 = i+1; i2 < points.length; i2++)
    {
  GenerateMathLineFromPoints(points[i].pos, points[i2].pos, color = "#ffffff");
  let i3;
  if (i == 0 && i2 == 1) i3 = 2;
  if (i == 0 && i2 == 2) i3 = 1;
  if (i == 1 && i2 == 2) i3 = 0;
  GenerateWeightLineFromPoints(points[i].pos, points[i].pos, points[i3].pos, color = "#ff0000");
}}
for (let i = 0; i < weightlines.length; i++)
{
  for (let i2 = i+1; i2 < weightlines.length; i2++)
  {
  GenerateInterceptionPoint(weightlines[i].a, weightlines[i2].a, weightlines[i].b, weightlines[i2].b, 25);
}}}
//setInterval(Spawn, 5);
Spawn("#ff0000");
Spawn("#00ff00");
Spawn("#0000ff");
//Spawn("#ffff00");
//Spawn("#ff00ff");
//Spawn("#00ffff");
GenerateLines();
setInterval(Render, 10);
