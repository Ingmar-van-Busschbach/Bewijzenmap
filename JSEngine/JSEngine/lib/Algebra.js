// Written by Ingmar van Busschbach
// Contents:
// class LinearLine
// class AngleCircle
// class LineIntersectionResult
// Functions

let angleCircles = [];
let linearLines = [];
let weightLines = [];
let perpendicularLines = [];

class LinearLine { //Linear algebra line with the formula y = ax + b, drawn within the boundaries of x1 and x2
  constructor(a, b, x1, x2, color = "#ffffff") {
  this.a = a;
  this.b = b;
  this.x1 = x1;
  this.x2 = x2;
  this.color = color;
  }

  Draw(context) {
    context.strokeStyle = this.color;

    context.beginPath();
    context.moveTo(this.x1, this.b);
    context.lineTo(this.x2, this.x2*this.a + this.b);
    context.stroke();
  }

  ReEvaluate(location, location2) {
    let x = location.x;
    let y = location.y;
    let result1 = location.Slope(location2);
    let result2 = -Evaluate(0, res1 * x - y);
    this.a = res1;
    this.b = res2;
  }
  ReEvaluatePerpendicular(location, angle) {
    let x = location.x;
    let y = location.y;
    let res1 = -1/angle;
    let res2 = -Evaluate(0, res1 * x - y);
    this.a = res1;
    this.b = res2;
  }
  ReEvaluateParalell(location, angle) {
    let x = location.x;
    let y = location.y;
    let res1 = angle;
    let res2 = -Evaluate(0, res1 * x - y);
    this.a = res1;
    this.b = res2;
  }
  ReEvaluate2Angles(location, angle, angle2) {
    let x = location.x;
    let y = location.y;
    let res1 = angle-(angle2-angle)/2;
    let res2 = -Evaluate(0, res1 * x - y);
    this.a = res1;
    this.b = res2;
  }
}

class AngleCircle { // Visual representation of the angle between 2 lines with angle1 and angle2.
  constructor(location, radius, angle1, angle2, orientation = 0, color = "#ffffff") {
    this.location = location;
    this.radius = radius;
    this.angle1 = angle1;
    this.angle2 = angle2;
    this.color = color;
    this.orientation = orientation;
  }
  ReEvaluate(location, line1, line2, radius = -1, orientation = -1) {
    this.location = location;
    this.angle1 = Math.atan(Math.min(line1.a, line2.a));
    this.angle2 = Math.atan(Math.max(line1.a, line2.a));
    if(orientation != -1){
      this.orientation = orientation;
    }
    if(radius != -1){
      this.radius = radius;
    }
  }
  draw(context) {
    let invert = false;
    let res1 = this.angle1;
    let res2 = this.angle2;
    if(this.angle1<=0 && this.angle2<=0 && this.orientation < 4){
      //invert = !invert;
      let res3 = Math.abs(this.angle1);
      let res4 = Math.abs(this.angle2);
      res1 = res3;
      res2 = res4;
      res1 = Math.PI*2-res1;
      res2 = Math.PI*2-res2;
    }
    if(this.angle1>0 && this.angle2>0 && this.orientation < 4){
      invert = !invert;
      res1 = Math.PI+res1;
    }
    if(this.angle1<0 && this.angle2<0 && this.orientation > 3){
      let res3 = Math.abs(this.angle1);
      let res4 = Math.abs(this.angle2);
      res1 = res3;
      res2 = res4;
      res1 = Math.PI-res1;
      res2 = Math.PI*2-(Math.PI+res2);
    }
    if(this.angle1>=0 && this.angle2>=0 && this.orientation > 3){
    }
    switch(this.orientation){
      case 0:
        break;
      case 1:
        res1 = Math.PI+res1;
        res2 = Math.PI+res2;
        break;
      case 2:
        res1 = Math.PI+res1;
        invert = !invert;
        break;
      case 3:
        res2 = Math.PI+res2;
        invert = !invert;
        break;
      case 4:
        break;
      case 5:
        //invert = !invert;
        res1 = Math.PI+res1;
        res2 = Math.PI+res2;
        break;
    }
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.location.x, this.location.y, this.radius, res1, res2, invert);
    context.fill();
    context.closePath();
  }
}

class LineIntersectionResult {
  constructor(intersects, atPoint){
    this.intersects = intersects;
    this.atPoint = atPoint;
  }
}

function Evaluate(x = this.x, formula = this.formula){
  let search = 'x';
  let formula2 = formula.toString();
  let result = eval(formula2.split(search).join(x.toString()));
  return result;
}

function InterceptReturnBoolean(a1, a2, b1, b2){
  if(a1 == a2) return false;
  let x = (b2-b1)/(a1-a2);
  if(x<0||x>width) return false;
  return true;
}
function InterceptReturnX(a1, a2, b1, b2){
  let x = (b2-b1)/(a1-a2);
  return x;
}
function InterceptReturnY(x, a, b){
  let y = a*x+b;
  return y;
}

function CalcIntercept(a1, a2, b1, b2){
  let intersectionResult = new LineIntersectionResult(false, new Vector2D(0,0));
  intersectionResult.intersects = InterceptReturnBoolean(a1, a2, b1, b2);
  if(intersectionResult.intersects){
    intersectionResult.atPoint.x = InterceptReturnX(a1, a2, b1, b2);
    intersectionResult.atPoint.y = InterceptReturnY(intersectionResult.atPoint.x, a1, b1);
  }
  return intersectionResult;
}
function IntersectionWithinBounds(intersectionPoint, bound1, bound2) {
  let intersectX = intersectionPoint.x < Math.max(bound1.x, bound2.x) && intersectionPoint.x > Math.min(bound1.x, bound2.x);
  if(Math.abs(bound1.x-bound2.x)<10){intersectX = true;}
  let intersectY = intersectionPoint.y < Math.max(bound1.y, bound2.y) && intersectionPoint.y > Math.min(bound1.y, bound2.y);
  if(Math.abs(bound1.y-bound2.y)<10){intersectY = true;}
  if(intersectX && intersectY)
  {
    return true;
  }
  else {
    return false;
  }
}

//Generate Angle Circles and Linear Lines
function GenerateAngleCircle(point, line1, line2, radius = 10, orientation = 0, color = "#ffffff", array = angleCircles) {
  let angle1 = Math.atan(Math.min(line1.a, line2.a));
  let angle2 = Math.atan(Math.max(line1.a, line2.a));
  array.push(new AngleCircle(point.location, radius, angle1, angle2, orientation, color))
}

function GenerateMathLineFromPoints(location1, location2, color = "#ffffff", array = linearLines) {
  let x = location1.x;
  let y = location1.y;
  let res1 = GetSlope(location1, location2);
  let res2 = -Evaluate(0, res1 * x - y);
  array.push(new MathLine(res1, res2, 0, width, color));
}

function GenerateWeightLineFromPoints(location1, location2, location3, color = "#ffffff", array = weightLines) {
  let x1 = location1.x;
  let y1 = location1.y;
  let x2 = location2.x;
  let y2 = location2.y;
  let x3 = location3.x;
  let y3 = location3.y;
  let locationition = new Vector2d((x1 - x2)/2+x2, (y1 - y2)/2+y2);
  let res1 = GetSlope(location3, locationition);
  let res2 = -Evaluate(0, res1 * x3 - y3);
  array.push(new MathLine(res1, res2, 0, width, color));
}

function GeneratePerpendicularLineFromPointAndLine(location1, angle, color = "#00ffff", array = perpendicularLines) {
  let x = location1.x;
  let y = location1.y;
  let res1 = -1/angle;
  let res2 = -Evaluate(0, res1 * x - y);
  array.push(new MathLine(res1, res2, 0, width, color));
}
