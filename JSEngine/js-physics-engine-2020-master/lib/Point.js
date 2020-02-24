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

  testCollision(){
    if (this.pos.dx + this.radius > bats[0].pos.dx && this.pos.dx - this.radius < bats[0].pos.dx + bats[0].size.dx && this.pos.dy + this.radius > bats[0].pos.dy && this.pos.dy - this.radius < bats[0].pos.dy + bats[0].size.dy) this.velocity.dx = makePositive(this.velocity.dx);
    if (this.pos.dx + this.radius > bats[1].pos.dx && this.pos.dx - this.radius < bats[1].pos.dx + bats[1].size.dx && this.pos.dy + this.radius > bats[1].pos.dy && this.pos.dy - this.radius < bats[1].pos.dy + bats[1].size.dy) this.velocity.dx = -makePositive(this.velocity.dx);
    if (this.pos.dx + this.radius > bats[2].pos.dx && this.pos.dx - this.radius < bats[2].pos.dx + bats[2].size.dx && this.pos.dy + this.radius > bats[2].pos.dy && this.pos.dy - this.radius < bats[2].pos.dy + bats[2].size.dy) this.velocity.dy = makePositive(this.velocity.dy);
    if (this.pos.dx + this.radius > bats[3].pos.dx && this.pos.dx - this.radius < bats[3].pos.dx + bats[3].size.dx && this.pos.dy + this.radius > bats[3].pos.dy && this.pos.dy - this.radius < bats[3].pos.dy + bats[3].size.dy) this.velocity.dy = -makePositive(this.velocity.dy);
  }

}
