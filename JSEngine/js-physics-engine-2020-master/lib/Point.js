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
    this.color = color;
    this.velocity = velocity;
    this.sinIndex = sinIndex;
    this.draggable = draggable;
  }

  move(speed = 1.0, score = true) {
    if (this.pos.x < 0 + this.radius) {
      this.velocity.x = makePositive(this.velocity.x);
      if(score) score2++;
    }
    if (this.pos.x > width - this.radius) {
      this.velocity.x = -makePositive(this.velocity.x);
      if(score) score1++;
    }
    if (this.pos.y < 0 + this.radius) {
      this.velocity.y = makePositive(this.velocity.x);
      if(score) score2++;
    }
    if (this.pos.y > height - this.radius) {
      this.velocity.y = -makePositive(this.velocity.x);
      if(score) score1++;
    }

    this.pos.x += (this.velocity.x*speed);
    this.pos.y += (this.velocity.y*speed);
  }

  moveSinus(speed = 1.0, score = true) {
    this.sinIndex++;

    this.velocity.x += sinusWave(this.sinIndex);
    this.velocity.y += sinusWave(this.sinIndex);
    if (this.velocity.x > 50) this.velocity.x = 50;
    if (this.velocity.y > 50) this.velocity.y = 50;

    if (this.pos.x < 0 + this.radius) {
      this.velocity.x = makePositive(this.velocity.x);
      if(score) score2++;
    }
    if (this.pos.x > width - this.radius) {
      this.velocity.x = -makePositive(this.velocity.x);
      if(score) score1++;
    }
    if (this.pos.y < 0 + this.radius) {
      this.velocity.y = makePositive(this.velocity.x);
      if(score) score2++;
    }
    if (this.pos.y > height - this.radius) {
      this.velocity.y = -makePositive(this.velocity.x);
      if(score) score1++;
    }

    this.pos.x += (this.velocity.x*speed);
    this.pos.y += (this.velocity.y*speed);
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
    //if (this.pos.x + this.radius > bats[0].pos.x && this.pos.x - this.radius < bats[0].pos.x + bats[0].size.x && this.pos.y + this.radius > bats[0].pos.y && this.pos.y - this.radius < bats[0].pos.y + bats[0].size.y) this.velocity.x = makePositive(this.velocity.x);
    //if (this.pos.x + this.radius > bats[1].pos.x && this.pos.x - this.radius < bats[1].pos.x + bats[1].size.x && this.pos.y + this.radius > bats[1].pos.y && this.pos.y - this.radius < bats[1].pos.y + bats[1].size.y) this.velocity.x = -makePositive(this.velocity.x);
    //if (this.pos.x + this.radius > bats[2].pos.x && this.pos.x - this.radius < bats[2].pos.x + bats[2].size.x && this.pos.y + this.radius > bats[2].pos.y && this.pos.y - this.radius < bats[2].pos.y + bats[2].size.y) this.velocity.y = makePositive(this.velocity.y);
    //if (this.pos.x + this.radius > bats[3].pos.x && this.pos.x - this.radius < bats[3].pos.x + bats[3].size.x && this.pos.y + this.radius > bats[3].pos.y && this.pos.y - this.radius < bats[3].pos.y + bats[3].size.y) this.velocity.y = -makePositive(this.velocity.y);
    if (this.pos.x + this.radius > x1 && this.pos.x - this.radius < x2 && this.pos.y + this.radius > y1 && this.pos.y - this.radius < y2) return true;
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
  Bounce(startVelocity, otherPoint) {
    let x = (this.pos.x - otherPoint.pos.x)/(this.radius + otherPoint.radius);
    let y = (this.pos.y - otherPoint.pos.y)/(this.radius + otherPoint.radius);
    this.velocity.x = this.velocity.x+10*x;
    this.velocity.y = this.velocity.y+10*y;
  }

  ChangeDirectionX(input) {
    if (input) this.velocity.x = makePositive(this.velocity.x);
    if (input == false) this.velocity.x = -makePositive(this.velocity.x);
  }
  ChangeDirectionY(input) {
    if (input) this.velocity.y = makePositive(this.velocity.y);
    if (input == false) this.velocity.y = -makePositive(this.velocity.y);
  }



  Drag() {
        if (this.draggable) {
          this.pos = new Vector2d(mouseX, mouseY);
        }
}
}
