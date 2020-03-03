let interceptionPoints = [];

class IntersectionPoint {
  constructor(pos, radius, color) {
    this.pos = pos;
    this.radius = radius;
    this.color = color;
  }

  draw(context) {
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.pos.dx, this.pos.dy, this.radius, 0, Math.PI * 2, true);
    context.fill();
    context.closePath();
  }

  ReEvaluate(a1, a2, b1, b2) {
    let result = CalcIntercept(a1, a2, b1, b2);
    if(result[0]){
    this.pos = new Vector2d(result[1], result[2]);
    console.log(result);
  }}
}

function GenerateInterceptionPoint(a1, a2, b1, b2, radius = 10, color = "#ffffff"){
  let result = CalcIntercept(a1, a2, b1, b2);
  if(result[0] == true){ interceptionPoints.push(new IntersectionPoint(new Vector2d(result[1], result[2]), radius, color));
  }
}
