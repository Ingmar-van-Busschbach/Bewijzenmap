const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let img_highres = new Image();
img_highres.src = "map_highres.jpg";
let img_lowres = new Image();
img_lowres.src = "map_lowres.jpg";
let scale;

let mousePressed = false;
let pointPressed = -1;
let point = new Point(new Vector2d(50, 50), 10, "white", new Vector2d(50,50));

this.addEventListener("mousedown", function(e) {
  mousePressed=true;
    if (point.testCollision(mouseX, mouseX, mouseY, mouseY)) {
      pointPressed = 1;
    }
});
this.addEventListener("mouseup", function(e) {
  mousePressed = false;
  pointPressed = -1;
});
this.addEventListener("mouseout", function(e) {
  mousePressed = false;
  pointPressed = -1;
});

this.addEventListener('mousemove', function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if(mousePressed) {
    point.Drag();
  }
});

img_lowres.addEventListener('load',()=>{
  scale = img_highres.width / img_lowres.width;
  setInterval(animate,10);
})

function animate() {
  context.clearRect(0, 0, width, height);
  context.drawImage(img_lowres, 0, 0);

  point.draw(context);
  context.fillRect(point.pos.dx - point.radius*5.5, point.pos.dy - point.radius*5.5, point.radius*11, point.radius*11);
  console.log(scale);
  context.drawImage(img_highres, (point.pos.dx-point.radius)*scale, (point.pos.dy-point.radius)*scale, 100, 100, point.pos.dx - point.radius*5, point.pos.dy - point.radius*5, point.radius*10, point.radius*10);
}
