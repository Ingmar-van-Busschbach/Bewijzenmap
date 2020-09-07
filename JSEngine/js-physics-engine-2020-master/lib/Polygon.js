/*
	23-2-2020
	klasse om een tweedimensionale vector mee aan te geven

	eigenschappen
	* dx (verschuiving in de x-richting)
	* dy (verschuiving in de y-richting )
*/
let polygonIncrement = 0;
class Polygon{
    constructor(pointArray, color = "#222222"){
        this.pointArray = pointArray;
        this.color = color;
    }

    draw(context){
        context.beginPath();
        context.fillStyle = this.color;
        context.moveTo(this.pointArray[0].pos.dx, this.pointArray[0].pos.dy);
        for(let i = 0; i < this.pointArray.length; i++){
          i+=polygonIncrement;
          if(i>=this.pointArray.length)i-=this.pointArray.length;
        context.lineTo(this.pointArray[i].pos.dx, this.pointArray[i].pos.dy);
        }
        context.lineTo(this.pointArray[0+polygonIncrement].pos.dx, this.pointArray[0+polygonIncrement].pos.dy);
        context.fill();
    }
}
