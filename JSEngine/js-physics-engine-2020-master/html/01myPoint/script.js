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
let increment = 1;
let score1 = 0;
let score2 = 0;
let move = true;
let movesinus = false;

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
    if(move) points[i].move();
    if(movesinus) points[i].moveSinus();
    let i2 = i+1;
    if(i2==points.length) i2=0;
    let i3 = i2+increment;
    if(i3>=points.length) i3-=points.length;
    mathlines[i].ReEvaluate(points[i].pos, points[i2].pos);
    let position3 = new Vector2d((points[i].pos.dx - points[i2].pos.dx)/2+points[i2].pos.dx, (points[i].pos.dy - points[i2].pos.dy)/2+points[i2].pos.dy);
        weightlines[i].ReEvaluate(points[i3].pos, position3);
        for (let i4 = 0; i4 < weightlines.length; i4++)
        {
          let i5 = i4+1;
          if(i5>=weightlines.length) i5=0;
        interceptionPoints[i4].ReEvaluate(weightlines[i4].a, mathlines[i4].a, weightlines[i4].b, mathlines[i4].b);
        interceptionPoints[i4].draw(context);
        interceptionPoints2[i4].ReEvaluate(weightlines[i4].a, weightlines[i5].a, weightlines[i4].b, weightlines[i5].b);
        interceptionPoints2[i4].draw(context);
        }
      points[i].draw(context);
      mathlines[i].draw(context);
      weightlines[i].draw(context);
  }}
function GenerateLines() {
  for (let i = 0; i < points.length; i++)
  {
    let i2 = i+1;
    if(i2>=points.length) i2=0;
    let i3 = i2+1;
    if(i3>=points.length) i3=0;
    GenerateMathLineFromPoints(points[i].pos, points[i2].pos, color = "#ffffff");
    GenerateWeightLineFromPoints(points[i].pos, points[i].pos, points[i3].pos, color = "#ff0000");
}
for (let i = 0; i < weightlines.length; i++)
{
  let i2 = i+1;
  if(i2>=weightlines.length) i2=0;
  GenerateInterceptionPoint(weightlines[i].a, mathlines[i].a, weightlines[i].b, mathlines[i].b);
  GenerateInterceptionPoint2(weightlines[i].a, weightlines[i2].a, weightlines[i].b, weightlines[i2].b);
}
}

//setInterval(Spawn, 5);
Spawn("#ff0000");
Spawn("#00ff00");
Spawn("#0000ff");
Spawn("#ffff00");
//Spawn("#ff00ff");
//Spawn("#00ffff");
GenerateLines();
//GenerateInterceptionPoint(weightlines[0].a, mathlines[0].a, weightlines[0].b, mathlines[0].b);
//GenerateInterceptionPoint(weightlines[1].a, mathlines[1].a, weightlines[1].b, mathlines[1].b);
//GenerateInterceptionPoint(weightlines[2].a, mathlines[2].a, weightlines[2].b, mathlines[2].b);
setInterval(Render, 10);
