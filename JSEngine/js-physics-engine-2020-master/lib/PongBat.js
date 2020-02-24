/*
	23-2-2020
	klasse om punten op de 2d context van een canvas te tekenen

	eigenschappen
	* pos (positie van het middelpunt m.b.v. een Vector2d)
	* radius (grootte van de cirkel in pixels)
	* color (kleur van het punt, als String)
*/

class PongBat {

  constructor(pos,size,color){
		// hier komt de constructor
    this.pos = pos;
    this.size = size;
    this.color = color;
  }

    move(up, down, i){
      if (up==true && y > 0) y -= 10;
      if (down==true && y < height-150) y += 10;
      this.pos.dy = y;
      context.beginPath();
      context.fillStyle = this.color;
      context.rect(this.pos.dx, y, this.size.dx, this.size.dy);
      context.closePath();
      context.fill();
    }
    move2(up, down, i){
      if (up==true && y2 > 0) y2 -= 10;
      if (down==true && y2 < height-150) y2 += 10;
      if (player2 == false) y2 = points[i].pos.dy - (this.size.dy / 2);
      this.pos.dy = y2;
      context.beginPath();
      context.fillStyle = this.color;
      context.rect(this.pos.dx, y2, this.size.dx, this.size.dy);
      context.closePath();
      context.fill();
    }
    move3(up, down, i){
      if (up==true && x > 0) x -= 10;
      if (down==true && x < width-150) x += 10;
      this.pos.dx = x;
      context.beginPath();
      context.fillStyle = this.color;
      context.rect(x, this.pos.dy, this.size.dx, this.size.dy);
      context.closePath();
      context.fill();
    }
    move4(up, down, i){
      if (up==true && x2 > 0) x2 -= 10;
      if (down==true && x2 < width-150) x2 += 10;
      if (player2 == false) x2 = points[i].pos.dx - (this.size.dx / 2);
      this.pos.dx = x2;
      context.beginPath();
      context.fillStyle = this.color;
      context.rect(x2, this.pos.dy, this.size.dx, this.size.dy);
      context.closePath();
      context.fill();
    }

}
