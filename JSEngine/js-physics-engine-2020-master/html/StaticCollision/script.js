const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let balls = [];
let bumpers = [];

bumpers.push(new Point(new Vector2d(width/2, height/2), 50, "#ffffff", new Vector2d(0,0), 0, false));
bumpers.push(new Point(new Vector2d(width/4, height/2), 50, "#ffffff", new Vector2d(0,0), 0, false));
bumpers.push(new Point(new Vector2d(width-width/4, height/2), 50, "#ffffff", new Vector2d(0,0), 0, false));
bumpers.push(new Point(new Vector2d(width/2, height/4), 50, "#ffffff", new Vector2d(0,0), 0, false));
bumpers.push(new Point(new Vector2d(width/2, height-height/4), 50, "#ffffff", new Vector2d(0,0), 0, false));
bumpers.push(new Point(new Vector2d(width/3, height/3), 50, "#ffffff", new Vector2d(0, 0), 0, false));
bumpers.push(new Point(new Vector2d(width-width/3, height-height/3), 50, "#ffffff", new Vector2d(0, 0), 0, false));
bumpers.push(new Point(new Vector2d(width-width/3, height/3), 50, "#ffffff", new Vector2d(0, 0), 0, false));
bumpers.push(new Point(new Vector2d(width/3, height-height/3), 50, "#ffffff", new Vector2d(0, 0), 0, false));
bumpers.push(new Point(new Vector2d(width/10, height/2), 50, "#ffffff", new Vector2d(0,0), 0, false));
bumpers.push(new Point(new Vector2d(width-width/10, height/2), 50, "#ffffff", new Vector2d(0,0), 0, false));
bumpers.push(new Point(new Vector2d(width/2.5, height/8), 50, "#ffffff", new Vector2d(0,0), 0, false));
bumpers.push(new Point(new Vector2d(width/2.5, height-height/8), 50, "#ffffff", new Vector2d(0,0), 0, false));
bumpers.push(new Point(new Vector2d(width-width/2.5, height/8), 50, "#ffffff", new Vector2d(0,0), 0, false));
bumpers.push(new Point(new Vector2d(width-width/2.5, height-height/8), 50, "#ffffff", new Vector2d(0,0), 0, false));
bumpers.push(new Point(new Vector2d(width/8, height/8), 50, "#ffffff", new Vector2d(0, 0), 0, false));
bumpers.push(new Point(new Vector2d(width-width/8, height-height/8), 50, "#ffffff", new Vector2d(0, 0), 0, false));
bumpers.push(new Point(new Vector2d(width-width/8, height/8), 50, "#ffffff", new Vector2d(0, 0), 0, false));
bumpers.push(new Point(new Vector2d(width/8, height-height/8), 50, "#ffffff", new Vector2d(0, 0), 0, false));

balls.push(new Point(new Vector2d(100, 500), 10, "#ff0000", new Vector2d(10,10), 0, false));
balls.push(new Point(new Vector2d(100, 600), 10, "#ff0000", new Vector2d(10,10), 1000, false));
balls.push(new Point(new Vector2d(100, 500), 10, "#ff0000", new Vector2d(10,10), 1000, false));
balls.push(new Point(new Vector2d(100, 600), 10, "#ff0000", new Vector2d(10,10), 0, false));
balls.push(new Point(new Vector2d(width-100, 500), 10, "#ff0000", new Vector2d(10,10), 0, false));
balls.push(new Point(new Vector2d(width-100, 600), 10, "#ff0000", new Vector2d(10,10), 1000, false));
balls.push(new Point(new Vector2d(width-100, 500), 10, "#ff0000", new Vector2d(10,10), 1000, false));
balls.push(new Point(new Vector2d(width-100, 600), 10, "#ff0000", new Vector2d(10,10), 0, false));

function Render() {
  context.clearRect(0, 0, width, height);
  for(i = 0; i <balls.length; i++) {
  for(i2 = 0; i2 < bumpers.length; i2++) {
    bumpers[i2].draw(context);
    if(balls[i].testCircleCollision(bumpers[i2].pos.dx, bumpers[i2].pos.dy, bumpers[i2].radius)) {
        balls[i].color = "#ff0000";
        balls[i].Bounce(10, bumpers[i2]);
      } else {
        balls[i].color = "#00ffff";
      }
      context.globalAlpha = 0.2;
      context.beginPath();
      context.strokeStyle = balls[i].color;
      context.lineWidth = balls[i].radius/3;
      context.moveTo(balls[i].pos.dx, balls[i].pos.dy);
      context.lineTo(bumpers[i2].pos.dx, bumpers[i2].pos.dy);
      context.stroke();
      context.closePath();
      context.globalAlpha = 1;
    }
    balls[i].moveSinus(0.5, false);
    balls[i].draw(context);
    balls[i].drawVelocity(context);
  }
}

setInterval(Render, 10);
