/*
	23-2-2020
	klasse om punten op de 2d context van een canvas te tekenen

	eigenschappen
	* pos (positie van het middelpunt m.b.v. een Vector2d)
	* radius (grootte van de cirkel in pixels)
	* color (kleur van het punt, als String)
*/


class Point {
  constructor(pos, radius, color, velocity, sinIndex = 0, draggable = true) {
    // hier komt de constructor
    this.pos = pos;
    this.radius = radius;
    this.baseColor = color;
    this.color = color;
    this.velocity = velocity;
    this.sinIndex = sinIndex;
    this.draggable = draggable;
  }
  move() {
    this.pos.x += (this.velocity.x);
    this.pos.y += (this.velocity.y);
  }

  draw(context) {
    //hier komt de code om een cirkel te tekenen
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, true);
    context.fill();
    context.closePath();
  }
  drawVelocity(context) {
    context.beginPath();
    context.strokeStyle = this.color;
    context.lineWidth = this.radius/3;
    context.moveTo(this.pos.x, this.pos.y);
    context.lineTo(this.pos.x+(this.velocity.x*10), this.pos.y+(this.velocity.y*10));
    context.stroke();
    context.closePath();
  }
  testCollision(x1, x2, y1, y2) {
    return this.pos.x + this.radius > x1 && this.pos.x - this.radius < x2 && this.pos.y + this.radius > y1 && this.pos.y - this.radius < y2;
  }
  testCircleCollision(x1, y1, r1) {
    let a;
    let x;
    let y;
    a = this.radius + r1;
    x = this.pos.x - x1;
    y = this.pos.y - y1;
    if (a > Math.sqrt((x * x) + (y * y))) {
        return true;
    } else {
        return false;
    }
  }
  Bounce(otherPoint) {
    let x = (this.pos.x - otherPoint.pos.x)/(this.radius + otherPoint.radius);
    let y = (this.pos.y - otherPoint.pos.y)/(this.radius + otherPoint.radius);
    this.velocity.x = this.velocity.x+10*x;
    this.velocity.y = this.velocity.y+10*y;
  }

  ChangeDirectionX(input) {
    if (input) this.velocity.x = ABS(this.velocity.x);
    if (input == false) this.velocity.x = -ABS(this.velocity.x);
  }
  ChangeDirectionY(input) {
    if (input) this.velocity.y = ABS(this.velocity.y);
    if (input == false) this.velocity.y = -ABS(this.velocity.y);
  }



  Drag() {
        if (this.draggable) {
          this.pos = new Vector2D(mouseX, mouseY);
        }
}
}
