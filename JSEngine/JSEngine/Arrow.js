let arrows = [];

class Arrow {
  constructor(pos, size, size2, angle = 0, color = "#ffffff") {
  this.pos = pos;
  this.angle = angle;
  this.size = size;
  this.size2 = size2;
  this.color = color;
  }
  animate(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y);
    context.rotate(this.angle);
    this.draw(context);
    context.restore();
  }
  draw(context) {
    context.beginPath();
    context.fillStyle = this.color;
    context.moveTo(0,0);
    context.lineTo(0,this.size.y);
    context.lineTo(this.size.x,this.size.y);
    context.lineTo(this.size.x,this.size2.y);
    context.lineTo(this.size.x + this.size2.x,0);
    context.lineTo(this.size.x,-this.size2.y);
    context.lineTo(this.size.x,-this.size.y);
    context.lineTo(0,-this.size.y);
    context.moveTo(0,0);
    context.closePath();
    context.stroke();
    context.fill();
  }
  CalculateAngle(pos1, pos2) {
    this.angle = Math.atan2(pos2.y-pos1.y,pos2.x-pos1.x);
  }
  ReEvaluate(pos1, pos2) {
    this.pos = pos1;
    this.size.x = Math.sqrt((pos2.x-pos1.x)*(pos2.x-pos1.x)+(pos2.y-pos1.y)*(pos2.y-pos1.y))/3*2;
    this.size2.x = Math.sqrt((pos2.x-pos1.x)*(pos2.x-pos1.x)+(pos2.y-pos1.y)*(pos2.y-pos1.y))/3;
    this.size.y = Math.min((Math.sqrt((pos2.x-pos1.x)*(pos2.x-pos1.x)+(pos2.y-pos1.y)*(pos2.y-pos1.y))/9),25);
    this.size2.y = Math.min((Math.sqrt((pos2.x-pos1.x)*(pos2.x-pos1.x)+(pos2.y-pos1.y)*(pos2.y-pos1.y))/9*2),50);
    this.CalculateAngle(pos1, pos2);
  }
}
