const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let img,numberOnARow,numberOnAColumn,sx,sy,sw,sh,x,y,w,h,index,animationspeed;
img = new Image();
img.src = "tanksheet.png";

animationspeed = 10;

class AnimatableObject{
  constructor(img,spriteWidth,spriteHeight,posx=0,posy=0,velx=0,vely=0,startIndex=0,endIndex=0)
  {
    this.startIndex = startIndex;
    this.index = startIndex;
    if(endIndex!=0){
      this.endIndex = endIndex;
    }
    else{
      this.endIndex = spriteWidth*spriteHeight;
    }
    this.img = img;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.posx = posx;
    this.posy = posy;
    this.sw = img.width/this.spriteWidth;
    this.sh = img.height/this.spriteHeight;
  }
  display(){
    this.sx = (this.index%this.spriteWidth)*this.sw;
    this.sy = Math.floor(this.index/this.spriteWidth)*this.sh;
    context.drawImage(this.img,this.sx,this.sy,this.sw,this.sh,this.posx,this.posy,this.sw,this.sh);
  }
  animate(){
    this.index++;
    if(this.index>=this.endIndex){this.index=this.startIndex;}
    this.sx = (this.index%this.spriteWidth)*this.sw;
    this.sy = Math.floor(this.index/this.spriteWidth)*this.sh;
    context.drawImage(this.img,this.sx,this.sy,this.sw,this.sh,this.posx,this.posy,this.sw,this.sh);
    console.log(this.index);
  }
  gridAnimate(x,y){
    this.index++;
    if(this.index>=this.endIndex){this.index=this.startIndex;}
    this.sx = (this.index%this.spriteWidth)*this.sw;
    this.sy = Math.floor(this.index/this.spriteWidth)*this.sh;
    context.drawImage(this.img,this.sx,this.sy,this.sw,this.sh,this.posx,this.posy,this.sw,this.sh);
    console.log(this.index);
  }
}
let tank;
let tank2;
let tile;

img.addEventListener('load',()=>{
  tile = new AnimatableObject(img,8,4, 0, 0, 0, 0, 0, 0)
  tank = new AnimatableObject(img,8,4, 100, 100, 0, 0, 1, 9)
  tank2 = new AnimatableObject(img,8,4, 300, 100, 0, 0, 9, 17)
  setInterval(animate, 1000/animationspeed);
})

function animate(){
  context.clearRect(0, 0, height*2, width*2);
  tile.display();
  tank.animate();
  tank2.animate();
}
