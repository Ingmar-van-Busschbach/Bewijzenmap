const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let x = 0;
let img, angle
angle = 0.01;
img = new Image();
img.src = "cogwheel.png";
img.addEventListener('load',()=>{
  setInterval(animate,10);
})

function animate() {
  context.clearRect(0,0,width,height);
  context.save();
  context.translate(300+250*Math.sin(x),300-150*Math.sin(x/2));
  context.rotate(angle);
  context.drawImage(img, -210, -210, 420, 420);
  context.restore();
  context.save();
  context.translate(600+250*Math.sin(x),300-150*Math.sin(x/2));
  context.rotate(-angle+0.3);
  context.drawImage(img, -210, -210, 420, 420);
  context.restore();
  context.save();
  context.translate(900+250*Math.sin(x),300-150*Math.sin(x/2));
  context.rotate(angle);
  context.drawImage(img, -210, -210, 420, 420);
  context.restore();
  context.save();
  context.translate(300+250*Math.sin(x),600-150*Math.sin(x/2));
  context.rotate(-angle+0.3);
  context.drawImage(img, -210, -210, 420, 420);
  context.restore();
  context.save();
  context.translate(600+250*Math.sin(x),600-150*Math.sin(x/2));
  context.rotate(angle);
  context.drawImage(img, -210, -210, 420, 420);
  context.restore();
  context.save();
  context.translate(900+250*Math.sin(x),600-150*Math.sin(x/2));
  context.rotate(-angle+0.3);
  context.drawImage(img, -210, -210, 420, 420);
  context.restore();
  angle += 0.01;
  x += 0.01;
}
