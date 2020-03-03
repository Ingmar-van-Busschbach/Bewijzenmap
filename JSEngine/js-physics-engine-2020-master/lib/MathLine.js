/*
	23-2-2020
	klasse om een tweedimensionale vector mee aan te geven

	eigenschappen
	* dx (verschuiving in de x-richting)
	* dy (verschuiving in de y-richting )
*/
let mathlines = [];
let weightlines = [];
class Mathline {
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
    x = pos1.dx;
    y = pos1.dy;
    res1 = GetSlope(pos1, pos2);
    res2 = -Evaluate(0, res1 * x - y);
    this.a = res1;
    this.b = res2;
  }
}

function GenerateMathLineFromPoints(pos1, pos2, color = "#ffffff") {
  x = pos1.dx;
  y = pos1.dy;
  res1 = GetSlope(pos1, pos2);
  res2 = -Evaluate(0, res1 * x - y);
  mathlines.push(new Mathline(res1, res2, 0, width, color));
}

function GenerateWeightLineFromPoints(pos1, pos2, pos3, color = "#ffffff") {
  x1 = pos1.dx;
  y1 = pos1.dy;
  x2 = pos2.dx;
  y2 = pos2.dy;
  x3 = pos3.dx;
  y3 = pos3.dy;
  let position = new Vector2d((x1 - x2)/2+x2, (y1 - y2)/2+y2);
  res1 = GetSlope(pos3, position);
  res2 = -Evaluate(0, res1 * x3 - y3);
  weightlines.push(new Mathline(res1, res2, 0, width, color));
}
