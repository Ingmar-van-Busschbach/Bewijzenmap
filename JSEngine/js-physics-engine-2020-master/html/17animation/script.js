const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let img,numberOnARow,numberOnAColumn,sx,sy,sw,sh,x,y,w,h,index,animationspeed,posx,posy,speed;
img = new Image();
img.src = "runningcat.png";

index = 0;
numberOnARow = 2;
numberOnAColumn = 4;
animationspeed = 10;
speed = animationspeed*10;
posx = 100;
posy = 100;

img.addEventListener('load',()=>{
  sw = img.width/numberOnARow;
  sh = img.height/numberOnAColumn;
  setInterval(animate, 1000/animationspeed);
})

function animate(){
  context.clearRect(0, 0, height*2, width*2);
  index++;
  posx+=speed;
  if(posx>=width-sw)
  {
    posx=0;
    speed=-speed;
    context.translate(width, 0);
    context.scale(-1, 1);
  }
  if(posx<=0)
  {
    speed=-speed;
    context.translate(0, 0);
    context.scale(1, 1);
  }
  if(index>=8){index=0;}
  sx= (index%numberOnARow)*sw;
  sy = Math.floor(index/numberOnARow)*sh;
  context.drawImage(img,sx,sy,sw,sh, posx,posy,sw,sh);
}
