/*
	23-2-2020
	klasse om punten op de 2d context van een canvas te tekenen

	eigenschappen
	* pos (positie van het middelpunt m.b.v. een Vector2d)
	* radius (grootte van de cirkel in pixels)
	* color (kleur van het punt, als String)
*/

class Point {

  constructor(pos,radius,color,velocity,sinIndex=0){
		// hier komt de constructor
    this.pos = pos;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.sinIndex = sinIndex;
  }

  move(){
    if (this.pos.dx < 0 + this.radius) this.velocity.dx = makePositive(this.velocity.dx);
    if (this.pos.dx > width - this.radius) this.velocity.dx = -makePositive(this.velocity.dx);
    if (this.pos.dy < 0 + this.radius) this.velocity.dy = makePositive(this.velocity.dx);
    if (this.pos.dy > height - this.radius) this.velocity.dy = -makePositive(this.velocity.dx);

    this.pos.dx += this.velocity.dx;
    this.pos.dy += this.velocity.dy;
  }

  moveSinus(){
    this.sinIndex++;

    this.velocity.dx += sinusWave(this.sinIndex);
    this.velocity.dy += sinusWave(this.sinIndex);
    if(this.velocity.dx > 50) this.velocity.dx = 50;
    if(this.velocity.dy > 50) this.velocity.dy = 50;

    if (this.pos.dx < 0 + this.radius) this.velocity.dx = makePositive(this.velocity.dx);
    if (this.pos.dx > width - this.radius) this.velocity.dx = -makePositive(this.velocity.dx);
    if (this.pos.dy < 0 + this.radius) this.velocity.dy = makePositive(this.velocity.dx);
    if (this.pos.dy > height - this.radius) this.velocity.dy = -makePositive(this.velocity.dx);

    this.pos.dx += this.velocity.dx;
    this.pos.dy += this.velocity.dy;
  }

  draw(context){
		//hier komt de code om een cirkel te tekenen
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.pos.dx, this.pos.dy, this.radius, 0, Math.PI * 2, true);
    context.fill();
    context.closePath();
  }

}
