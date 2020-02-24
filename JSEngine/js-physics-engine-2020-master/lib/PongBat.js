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

  drawBat(context, yposition){
		//hier komt de code om een cirkel te tekenen
    this.drawbat = function(yposition) {
      // Drawing the instance of Circle
      context.beginPath();
      context.fillStyle = this.color;
      context.rect(this.pos.dx, yposition, this.size.dx, this.size.dy);
      context.closePath();
      context.fill();
    }

    drawenemybat(yposition) {
      // Drawing the instance of Circle
      if (player2 == false) {
        if (yposition > enemyY) enemyY += enemySpeed;
        if (yposition < enemyY) enemyY -= enemySpeed;
      }
      if (player2 == true) enemyY = yposition;

      context.beginPath();
      context.fillStyle = this.color;
      context.rect(this.pos.dx, yposition, this.size.dx, this.size.dy);
      context.closePath();
      context.fill();
    }
  }

}
