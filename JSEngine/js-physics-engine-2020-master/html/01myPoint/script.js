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
let increment2 = 1;
let score1 = 0;
let score2 = 0;
let move = false;
let movesinus = false;
let movespeed = 1.0;
let formation = true;
let offset = 0;
let radius = 250;
let rotationspeed = 0.001;
let z = 0;
let sinusradiusdivider = 100;
let movecenterpoint = false;
let showLines = true;
let showInterception = true;
let showPolygon = true;
let showPerpendiculars = true;
let showParalells = true;





this.addEventListener("mousedown", function(e) {
  mousePressed=true;
  for (let i = 0; i < points.length; i++) {
    if (points[i].testCollision(mouseX, mouseX, mouseY, mouseY)) {
      pointPressed = i;
    }
  }
  if (centerPoint.testCollision(mouseX, mouseX, mouseY, mouseY)) {
    movecenterpoint = true;
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
if(mousePressed && movecenterpoint) {
  centerPoint.Drag();
}
});




document.addEventListener('keydown', function(event) {
  if (event.keyCode == 49) {
    console.log("Moving");
  }
  if (event.keyCode == 50) {
    console.log("Moving with sinus movement");
  }
  if (event.keyCode == 51) {
    increment--;
    console.log("increment: ", increment);
  }
  if (event.keyCode == 52) {
    increment++;
    console.log("increment: ", increment);
  }
  if (event.keyCode == 53) {
    SpawnDuringRuntime(GetRainbowColor(points.length));
    rotationspeed = rotationspeed / 1.12;
    movespeed = movespeed / 1.12;
    sinusradiusdivider = sinusradiusdivider * 1.01;
    console.log("Spawn successfull");
  }
  if (event.keyCode == 54) {
    movespeed--;
    console.log("movespeed: ", movespeed);
  }
  if (event.keyCode == 55) {
    movespeed-=0.1;
    console.log("movespeed: ", movespeed);
  }
  if (event.keyCode == 56) {
    movespeed+=0.1;
    console.log("movespeed: ", movespeed);
  }
  if (event.keyCode == 57) {
    movespeed++;
    console.log("movespeed: ", movespeed);
  }
});











function Spawn(color = "#ffffff") {
  randomwidth = getRandomInt(250, width-250);
  randomheight = getRandomInt(250, height-250);
  if (points.length <= 100) {
  points.push(new Point(new Vector2d(randomwidth, randomheight), 10, color, new Vector2d(getRandomInt(-25, 25)/10,getRandomInt(-25, 25)/10), getRandomInt(0, 500)));
  }
}
function SpawnDuringRuntime(color = "#ffffff") {
  randomwidth = getRandomInt(250, width-250);
  randomheight = getRandomInt(250, height-250);
  if (points.length <= 100) {
  points.push(new Point(new Vector2d(randomwidth, randomheight), 10, color, new Vector2d(getRandomInt(-25, 25)/10,getRandomInt(-25, 25)/10), getRandomInt(0, 500)));
  GenerateMathLineFromPoints(points[0].pos, points[1].pos, GetRainbowColor(points.length+5));
  GenerateWeightLineFromPoints(points[0].pos, points[0].pos, points[2].pos, GetRainbowColor(points.length+10));
  GenerateInterceptionPoint(weightlines[0].a, mathlines[0].a, weightlines[0].b, mathlines[0].b, interceptionPoints, 5, GetRainbowColor(points.length+5));
  GenerateInterceptionPoint(weightlines[0].a, weightlines[1].a, weightlines[0].b, weightlines[1].b, interceptionPoints2, 10, GetRainbowColor(points.length+5));
  GeneratePerpendicularLineFromPointAndLine(points[0].pos, mathlines[0].a, perpendiculars, GetRainbowColor(points.length+10));
  GeneratePerpendicularLineFromPointAndLine(points[1].pos, mathlines[0].a, perpendiculars2, GetRainbowColor(points.length+20));
  GeneratePerpendicularLineFromPointAndLine(points[2].pos, mathlines[0].a, parallels, GetRainbowColor(points.length+30));
  GenerateInterceptionPoint(parallels[0].a, parallels[1].a, parallels[0].b, parallels[1].b, interceptionPoints3, 15, GetRainbowColor(points.length+5));
  }
}
function GenerateLines() {
  for (let i = 0; i < points.length; i++)
  {
    let i2 = i+1;
    if(i2>=points.length) i2=0;
    let i3 = i2+1;
    if(i3>=points.length) i3=0;
    GenerateMathLineFromPoints(points[i].pos, points[i2].pos, color = GetRainbowColor(points.length+5));
    GeneratePerpendicularLineFromPointAndLine(points[i].pos, mathlines[i].a, perpendiculars, GetRainbowColor(points.length+10));
    GeneratePerpendicularLineFromPointAndLine(points[i2].pos, mathlines[i].a, perpendiculars2, GetRainbowColor(points.length+20));
    GeneratePerpendicularLineFromPointAndLine(points[i3].pos, mathlines[i].a, parallels, GetRainbowColor(points.length+30));
    GenerateWeightLineFromPoints(points[i].pos, points[i].pos, points[i3].pos, color = GetRainbowColor(points.length+10));
  }
  for (let i = 0; i < weightlines.length; i++)
  {
    let i2 = i+1;
    if(i2>=weightlines.length) i2=0;
    GenerateInterceptionPoint(weightlines[i].a, mathlines[i].a, weightlines[i].b, mathlines[i].b, interceptionPoints, 5, GetRainbowColor(points.length+5));
    GenerateInterceptionPoint(weightlines[i].a, weightlines[i2].a, weightlines[i].b, weightlines[i2].b, interceptionPoints2, 10, GetRainbowColor(points.length+5));
  }
  for (let i = 0; i < parallels.length; i++)
  {
    let i2 = i+1;
    if(i2>=parallels.length) i2=0;
    GenerateInterceptionPoint(parallels[i].a, parallels[i2].a, parallels[i].b, parallels[i2].b, interceptionPoints3, 15, GetRainbowColor(points.length+5));
  }
}
randomwidth = getRandomInt(250, width-250);
randomheight = getRandomInt(250, height-250);
let centerPoint = new Point(new Vector2d(randomwidth, randomheight), 10, "#000000", new Vector2d(getRandomInt(-25, 25)/10,getRandomInt(-25, 25)/10), getRandomInt(0, 500));








function Render() {
  context.clearRect(0, 0, width, height);
  if(showPolygon)polygon.draw(context);
  for (let i = 0; i < points.length; i++)
  {
    if(move && formation==false || key1 && formation==false) points[i].move(movespeed);
    if(movesinus && formation==false || key2 && formation==false) points[i].moveSinus(movespeed);
    if(move && formation || key1 && formation) centerPoint.move(movespeed);
    if(movesinus && formation || key2 && formation) centerPoint.move(movespeed);
    if(key0){
      z++;
      radius = (Math.sin(z/sinusradiusdivider)/3)+radius;
      }
    if(formation){
      let slice = 2 * Math.PI / points.length;
      offset+=rotationspeed;
        for (let i = 0; i < points.length; i++) {
            let angle;
            angle = slice * i + offset;
      points[i].pos.dx = centerPoint.pos.dx + radius * Math.cos(angle);
      points[i].pos.dy = centerPoint.pos.dy + radius * Math.sin(angle);
    }
    for(let test = 0; test < points.length; test++){
      let collisionX1 = points[i].testCollision(0, 0, 0, height);
      let collisionX2 = points[i].testCollision(width, width, 0, height);
      let collisionY1 = points[i].testCollision(0, width, 0, 0);
      let collisionY2 = points[i].testCollision(0, width, height, height);
      if(collisionX1) centerPoint.ChangeDirectionX(true);
      if(collisionX2) centerPoint.ChangeDirectionX(false);
      if(collisionY1) centerPoint.ChangeDirectionY(true);
      if(collisionY2) centerPoint.ChangeDirectionY(false);
    }
    }

    let i2 = i+increment2;
    if(i2>=points.length) i2-=points.length;
    let i3 = i2+increment;
    if(i3>=points.length) i3-=points.length;

    mathlines[i].ReEvaluate(points[i].pos, points[i2].pos);
    let position2 = new Vector2d(points[i].pos.dx+(points[i2].pos.dx-points[i3].pos.dx), points[i].pos.dy+(points[i2].pos.dy-points[i3].pos.dy)/*(points[i].pos.dx - points[i2].pos.dx)/2+points[i2].pos.dx, (points[i].pos.dy - points[i2].pos.dy)/2+points[i2].pos.dy*/);
    let position3 = new Vector2d((points[i].pos.dx - points[i2].pos.dx)/2+points[i2].pos.dx, (points[i].pos.dy - points[i2].pos.dy)/2+points[i2].pos.dy);
    weightlines[i].ReEvaluate(points[i3].pos, position2);


    perpendiculars[i].ReEvaluatePerpendicular(points[i].pos, mathlines[i].a);
    perpendiculars2[i].ReEvaluatePerpendicular(points[i2].pos, mathlines[i].a);
    parallels[i].ReEvaluatePerpendicular(position3, mathlines[i].a);

    if(showInterception){
    for (let i4 = 0; i4 < weightlines.length; i4++)
      {
        let i5 = i4+1;
        if(i5>=weightlines.length) i5=0;
        interceptionPoints[i4].ReEvaluate(weightlines[i4].a, mathlines[i4].a, weightlines[i4].b, mathlines[i4].b);
        interceptionPoints[i4].draw(context);
        interceptionPoints2[i4].ReEvaluate(weightlines[i4].a, weightlines[i5].a, weightlines[i4].b, weightlines[i5].b);
        interceptionPoints2[i4].draw(context);
      }
      for (let i4 = 0; i4 < mathlines.length; i4++)
        {
          let i5 = i4+1;
          if(i5>=mathlines.length) i5=0;
          interceptionPoints3[i4].ReEvaluate(parallels[i4].a, parallels[i5].a, parallels[i4].b, parallels[i5].b);
          interceptionPoints3[i4].draw(context);
        }
    }
    points[i].draw(context);
    if(showLines)mathlines[i].draw(context);
    if(showLines)weightlines[i].draw(context);
    if(showPerpendiculars)perpendiculars[i].draw(context);
    if(showPerpendiculars)perpendiculars2[i].draw(context);
    if(showParalells)parallels[i].draw(context);
    if(formation)centerPoint.draw(context);
  }
  for(let interceptions = 0; interceptions < interceptionPoints3.length; interceptions++){
  context.beginPath();
  context.strokeStyle = GetRainbowColor(interceptions);
  context.arc(interceptionPoints3[interceptions].pos.dx, interceptionPoints3[interceptions].pos.dy, GetDistance(interceptionPoints3[interceptions].pos, points[interceptions].pos), 0, Math.PI * 2, true);
  context.stroke();
  context.closePath();

  context.beginPath();
  context.strokeStyle = GetRainbowColor(interceptions);
  context.arc(interceptionPoints2[interceptions].pos.dx, interceptionPoints2[interceptions].pos.dy, GetDistance(interceptionPoints2[interceptions].pos, interceptionPoints[interceptions].pos), 0, Math.PI * 2, true);
  context.stroke();
  context.closePath();
  }
}
Spawn(GetRainbowColor(points.length));
Spawn(GetRainbowColor(points.length));
Spawn(GetRainbowColor(points.length));
//Spawn("#ffff00");
//Spawn("#ff00ff");
//Spawn("#00ffff");
GenerateLines();
let polygon = new Polygon(points);
//setInterval(SpawnDuringRuntime, 1000);
setInterval(Render, 1);
