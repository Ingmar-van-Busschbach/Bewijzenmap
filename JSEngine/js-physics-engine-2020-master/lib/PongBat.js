/*
	23-2-2020
	klasse om punten op de 2d context van een canvas te tekenen

	eigenschappen
	* pos (positie van het middelpunt m.b.v. een Vector2d)
	* radius (grootte van de cirkel in pixels)
	* color (kleur van het punt, als String)
*/
let speed = 3;

class PongBat {

  constructor(pos,size,color){
		// hier komt de constructor
    this.pos = pos;
    this.size = size;
    this.color = color;
  }

    move(input, i){
      if (input > 0 && y > 0) y -= speed;
      if (input < 0 && y < height-150) y += speed;
      if (player1 == false) y = points[i].pos.dy - (this.size.dy / 2);
      this.pos.dy = y;
      context.beginPath();
      context.fillStyle = this.color;
      context.rect(this.pos.dx, y, this.size.dx, this.size.dy);
      context.closePath();
      context.fill();
    }
    move2(input, i){
      if (input > 0 && y2 > 0) y2 -= speed;
      if (input < 0 && y2 < height-150) y2 += speed;
      if (player2 == false) y2 = points[i].pos.dy - (this.size.dy / 2);
      this.pos.dy = y2;
      context.beginPath();
      context.fillStyle = this.color;
      context.rect(this.pos.dx, y2, this.size.dx, this.size.dy);
      context.closePath();
      context.fill();
    }
    move3(input, i){
      if (input > 0 && x > 0) x -= speed;
      if (input < 0 && x < width-150) x += speed;
      if (player1 == false) x = points[i].pos.dx - (this.size.dx / 2);
      this.pos.dx = x;
      context.beginPath();
      context.fillStyle = this.color;
      context.rect(x, this.pos.dy, this.size.dx, this.size.dy);
      context.closePath();
      context.fill();
    }
    move4(input, i){
      if (input > 0 && x2 > 0) x2 -= speed;
      if (input < 0 && x2 < width-150) x2 += speed;
      if (player2 == false) x2 = points[i].pos.dx - (this.size.dx / 2);
      this.pos.dx = x2;
      context.beginPath();
      context.fillStyle = this.color;
      context.rect(x2, this.pos.dy, this.size.dx, this.size.dy);
      context.closePath();
      context.fill();
    }

}
