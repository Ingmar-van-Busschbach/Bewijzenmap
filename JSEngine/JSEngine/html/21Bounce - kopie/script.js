const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let randomwidth = RandomInt(0, width);
let randomheight = RandomInt(0, height);
let color = "#006666";
let points = [];
let lines = [];
let gravity = 0.01;
let smallheight = height/750;
let smallwidth = width/1500;

function Spawn(ammount, color = "#ffffff", randomColor = false) {
  for(let i=0; i<ammount; i++){
    if(randomColor) color = RandomColor();
    randomwidth = RandomInt(250, width-250);
    randomheight = RandomInt(250, height-250);
    points.push(new Point(new Vector2D(randomwidth, randomheight), 10, color, new Vector2D(RandomInt(-5, 5)/10,RandomInt(-5, 5)/10), RandomInt(0, 500)));
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
        let heading = new Vector2D(x3, y3);
        let normal = V2DPerpendicular(heading);
        normal.Normalize(1);
        object.velocity = V2DMin(object.velocity, V2DMultF(normal, object.velocity.Dot(normal) * 2));
      }
    }
  }
}

function Render() {
  context.clearRect(0, 0, width, height);
  for(let i=0; i<lines.length; i++){
    lines[i].draw(context);
  }
  for(let i=0; i<points.length-2; i++){
    let va = V2DMin(points[i+1].pos, points[i].pos);
    let vb = V2DMin(points[i+2].pos, points[i].pos);
    let resolution = V2DResolveViaProjection(vb, va);
    let a = points[i].pos;
    let b = V2DPlus(resolution[0],points[i].pos);
    let c = V2DPlus(resolution[1],points[i].pos);
    let d = points[i+1].pos;
    let e = points[i+2].pos;
    context.beginPath();
    context.strokeStyle = color;
    context.moveTo(a.x, a.y);
    context.lineTo(d.x, d.y);
    context.moveTo(a.x, a.y);
    context.lineTo(e.x, e.y);
    context.stroke();
    context.closePath();
    context.beginPath();
    context.strokeStyle = "#ffffff";
    context.moveTo(a.x, a.y);
    context.lineTo(b.x, b.y);
    context.moveTo(a.x, a.y);
    context.lineTo(c.x, c.y);
    context.stroke();
    context.closePath();
  }
  for(let i=0; i<points.length; i++){
    points[i].draw(context);
    points[i].move();
    if(points[i].testCollision(-10,0,0, height)) {points[i].ChangeDirectionX(true);}
    if(points[i].testCollision(width,width+10,0, height)) {points[i].ChangeDirectionX(false);}
    if(points[i].testCollision(0,width,-10, 0)) {points[i].ChangeDirectionY(true);}
    if(points[i].testCollision(0,width,height, height+10)) {points[i].ChangeDirectionY(false);}
    if(i%3!=0)points[i].velocity.y += gravity;
    for(let j=0; j<lines.length; j++){
      lines[j].checkCollission(points[i]);
    }
  }
}
Spawn(4, RandomColor(), true);
SpawnLines(new Vector2D(0,250*smallheight), new Vector2D(250*smallwidth,0));
SpawnLines(new Vector2D(0,250*smallheight), new Vector2D(125*smallwidth,365*smallheight));
SpawnLines(new Vector2D(0,500*smallheight), new Vector2D(125*smallwidth,365*smallheight));
SpawnLines(new Vector2D(250*smallwidth,0), new Vector2D(500,250*smallheight));
SpawnLines(new Vector2D(500*smallwidth,250*smallheight), new Vector2D(650*smallwidth,250*smallheight));
SpawnLines(new Vector2D(250*smallwidth,250*smallheight), new Vector2D(500*smallwidth,500*smallheight));
SpawnLines(new Vector2D(500*smallwidth,600*smallheight), new Vector2D(750*smallwidth,550*smallheight));
SpawnLines(new Vector2D(750*smallwidth,0), new Vector2D(1000,250*smallheight));
SpawnLines(new Vector2D(1000*smallwidth,250*smallheight), new Vector2D(1250*smallwidth,0));
SpawnLines(new Vector2D(750*smallwidth,400*smallheight), new Vector2D(1000*smallwidth,350*smallheight));
SpawnLines(new Vector2D(1000*smallwidth,450*smallheight), new Vector2D(1250*smallwidth,650*smallheight));
setInterval(Render, 1);
