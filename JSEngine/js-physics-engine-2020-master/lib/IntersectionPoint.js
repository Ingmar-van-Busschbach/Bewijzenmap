let interceptionPoints = [];
let interceptionPoints2 = [];
let interceptionPoints3 = [];

class IntersectionPoint {
  constructor(pos, radius, color) {
    this.pos = pos;
    this.radius = radius;
    this.color = color;
  }

  draw(context) {
    context.beginPath();
    context.strokeStyle = this.color;
    context.arc(this.pos.dx, this.pos.dy, this.radius, 0, Math.PI * 2, true);
    context.stroke();
    context.closePath();
  }

  ReEvaluate(a1, a2, b1, b2) {
    let result = CalcIntercept(a1, a2, b1, b2);
    if(result[0]){
    this.pos = new Vector2d(result[1], result[2]);
  }}
  testCollision(x1, x2, y1, y2) {
    if (this.pos.dx + this.radius > x1 && this.pos.dx - this.radius < x2 && this.pos.dy + this.radius > y1 && this.pos.dy - this.radius < y2) return true;
  }
}

function GenerateInterceptionPoint(a1, a2, b1, b2, array = interceptionPoints, radius = 5, color = "#ffffff"){
  let result = CalcIntercept(a1, a2, b1, b2);
  if(result.intersects == true){ array.push(new IntersectionPoint(new Vector2d(intersectionResult.atPoint.x, intersectionResult.atPoint.y), radius, color));
  }
}
