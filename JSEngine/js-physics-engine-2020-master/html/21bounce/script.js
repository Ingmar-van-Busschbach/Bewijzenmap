const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let randomwidth = getRandomInt(0, width);
let randomheight = getRandomInt(0, height);
let color = "#006666";
let points = [];
let lines = [];
let gravity = 0.01;
let smallheight = height/750;
let smallwidth = width/1500;

function Spawn(ammount, color = "#ffffff", randomColor = false) {
  for(let i=0; i<ammount; i++){
    if(randomColor) color = getRandomColor();
    randomwidth = getRandomInt(250, width-250);
    randomheight = getRandomInt(250, height-250);
    points.push(new Point(new Vector2d(randomwidth, randomheight), 10, color, new Vector2d(getRandomInt(-25, 25)/10,getRandomInt(-25, 25)/10), getRandomInt(0, 500)));
  }
}

function SpawnLines(pos1, pos2, color = "#ffffff"){
    lines.push(new CollisionLine(pos1, pos2, 5, 5, color));
}

class CollisionLine{
  constructor(pos1, pos2, collisionMargin, thickness, color){
    this.pos1 = pos1;
    this.pos2 = pos2;
    this.collisionMargin = collisionMargin;
    this.thickness = thickness;
    this.color = color;
  }
  draw(context) {
    context.beginPath();
    context.strokeStyle = "#ffffff";
    context.lineWidth = this.thickness;
    context.moveTo(this.pos1.x, this.pos1.y);
    context.lineTo(this.pos2.x, this.pos2.y);
    context.fill();
    context.stroke();
    context.closePath();
  }
  checkCollission(object){
    let pos = object.pos;
    let x = Math.min(this.pos1.x, this.pos2.x);
    let y = Math.min(this.pos1.y, this.pos2.y);
    let x2 = Math.max(this.pos1.x, this.pos2.x);
    let y2 = Math.max(this.pos1.y, this.pos2.y);
    if(IsBetween(pos.x, x-this.collisionMargin, x2+this.collisionMargin) && IsBetween(pos.y, y-this.collisionMargin, y2+this.collisionMargin)){
      let x3 = this.pos2.x - this.pos1.x;
      let y3 = this.pos2.y - this.pos1.y;
      let result = ((Math.abs((this.pos2.y - this.pos1.y) * pos.x -
                              (this.pos2.x - this.pos1.x) * pos.y +
                               this.pos2.x * this.pos1.y -
                               this.pos2.y * this.pos1.x)) /
                    (Math.pow((Math.pow(y3, 2) +
                               Math.pow(x3, 2)),
                               0.5)));
      if(IsBetween(result, -this.collisionMargin,this.collisionMargin)){
        let heading = new Vector2d(x3, y3);
        let normal = perpendicularVector2d(heading);
        normal.Normalize(1);
        object.velocity = Vector2dMinVector2d(object.velocity, Vector2dMultFloat(normal, object.velocity.DotProduct(normal) * 2));
      }
    }
  }
}

function Render() {
  context.clearRect(0, 0, width, height);
  for(let i=0; i<lines.length; i++){
    lines[i].draw(context);
  }
  for(let i=0; i<points.length; i++){
    points[i].draw(context);
    points[i].move();
    points[i].speedColor(hexToRgb(points[i].baseColor));
    if(i%3!=0)points[i].velocity.y += gravity;
    for(let j=0; j<lines.length; j++){
      lines[j].checkCollission(points[i]);
    }
  }
}
Spawn(25, getRandomColor(), true);
SpawnLines(new Vector2d(0,250*smallheight), new Vector2d(250*smallwidth,0));
SpawnLines(new Vector2d(0,250*smallheight), new Vector2d(125*smallwidth,365*smallheight));
SpawnLines(new Vector2d(0,500*smallheight), new Vector2d(125*smallwidth,365*smallheight));
SpawnLines(new Vector2d(250*smallwidth,0), new Vector2d(500,250*smallheight));
SpawnLines(new Vector2d(500*smallwidth,250*smallheight), new Vector2d(650*smallwidth,250*smallheight));
SpawnLines(new Vector2d(250*smallwidth,250*smallheight), new Vector2d(500*smallwidth,500*smallheight));
SpawnLines(new Vector2d(500*smallwidth,600*smallheight), new Vector2d(750*smallwidth,550*smallheight));
SpawnLines(new Vector2d(750*smallwidth,0), new Vector2d(1000,250*smallheight));
SpawnLines(new Vector2d(1000*smallwidth,250*smallheight), new Vector2d(1250*smallwidth,0));
SpawnLines(new Vector2d(750*smallwidth,400*smallheight), new Vector2d(1000*smallwidth,350*smallheight));
SpawnLines(new Vector2d(1000*smallwidth,450*smallheight), new Vector2d(1250*smallwidth,650*smallheight));
setInterval(Render, 1);
