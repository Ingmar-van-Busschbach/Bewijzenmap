/*
	23-2-2020
	klasse om een tweedimensionale Vector2d mee aan te geven

	eigenschappen
	* x (verschuiving in de x-richting)
	* y (verschuiving in de y-richting )
*/
let mathlines = [];
let weightlines = [];
let angleCircles = [];
let perpendiculars = [];
let perpendiculars2 = [];
let parallels = [];
let parallels2 = [];

class LineIntersectionResult {
  constructor(intersects, atPoint){
    this.intersects = intersects;
    this.atPoint = atPoint;
  }
}

class AngleCircle {
  constructor(pos, radius, angle1, angle2, color = "#ffffff") {
    this.pos = pos;
    this.radius = radius;
    this.angle1 = angle1;
    this.angle2 = angle2;
    this.color = color;
  }
  ReEvaluate(pos, line1, line2) {
    this.pos = pos;
    this.angle1 = Math.atan(Math.min(line1.a, line2.a));
    this.angle2 = Math.atan(Math.max(line1.a, line2.a));
  }
  draw(context) {
    let res1 = this.angle1;
    let res2 = this.angle2;
    if(this.angle1<0 && this.angle2<0){
    let res3 = Math.abs(this.angle1);
    let res4 = Math.abs(this.angle2);
    res1 = Math.min(res1,res2);
    res2 = Math.max(res1,res2);
    }
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.pos.x, this.pos.y, this.radius, res1, res2, this.angle1<0 && this.angle2<0);
    context.fill();
    context.closePath();
  }
}

class MathLine {
  constructor(a, b, x1, x2, color = "#ffffff") {
  this.a = a;
  this.b = b;
  this.x1 = x1;
  this.x2 = x2;
  this.color = color;
  }

  draw(context) {
    context.beginPath();
    context.moveTo(this.x1, this.b);
    context.lineTo(this.x2, this.x2*this.a + this.b);
    context.strokeStyle = this.color;
    context.stroke();
  }

  ReEvaluate(pos1, pos2) {
    let x = pos1.x;
    let y = pos1.y;
    let res1 = GetSlope(pos1, pos2);
    let res2 = -Evaluate(0, res1 * x - y);
    this.a = res1;
    this.b = res2;
  }
  ReEvaluatePerpendicular(pos1, angle) {
    let x = pos1.x;
    let y = pos1.y;
    let res1 = -1/angle;
    let res2 = -Evaluate(0, res1 * x - y);
    this.a = res1;
    this.b = res2;
  }
  ReEvaluateParalell(pos1, angle) {
    let x = pos1.x;
    let y = pos1.y;
    let res1 = angle;
    let res2 = -Evaluate(0, res1 * x - y);
    this.a = res1;
    this.b = res2;
  }
  ReEvaluate2Angles(pos1, angle, angle2) {
    let x = pos1.x;
    let y = pos1.y;
    let res1 = angle-(angle2-angle)/2;
    let res2 = -Evaluate(0, res1 * x - y);
    this.a = res1;
    this.b = res2;
  }
}

function GenerateAngleCircle(point, line1, line2, radius = 10, color = "#ffffff") {
  let angle1 = Math.atan(Math.min(line1.a, line2.a));
  let angle2 = Math.atan(Math.max(line1.a, line2.a));
  angleCircles.push(new AngleCircle(point.pos, radius, angle1, angle2, color))
}

function GenerateMathLineFromPoints(pos1, pos2, color = "#ffffff") {
  let x = pos1.x;
  let y = pos1.y;
  let res1 = GetSlope(pos1, pos2);
  let res2 = -Evaluate(0, res1 * x - y);
  mathlines.push(new MathLine(res1, res2, 0, width, color));
}

function GenerateWeightLineFromPoints(pos1, pos2, pos3, color = "#ffffff") {
  let x1 = pos1.x;
  let y1 = pos1.y;
  let x2 = pos2.x;
  let y2 = pos2.y;
  let x3 = pos3.x;
  let y3 = pos3.y;
  let position = new Vector2d((x1 - x2)/2+x2, (y1 - y2)/2+y2);
  let res1 = GetSlope(pos3, position);
  let res2 = -Evaluate(0, res1 * x3 - y3);
  weightlines.push(new MathLine(res1, res2, 0, width, color));
}

function GeneratePerpendicularLineFromPointAndLine(pos1, angle, array = perpendiculars, color = "#00ffff") {
  let x = pos1.x;
  let y = pos1.y;
  let res1 = -1/angle;
  let res2 = -Evaluate(0, res1 * x - y);
  array.push(new MathLine(res1, res2, 0, width, color));
}
