const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let minuteHand, clock, angle, angle2, angle3
let d = new Date();
angle = d.getSeconds()*Math.PI/30;
angle2 = d.getMinutes()*Math.PI/30+angle*Math.PI/210;
angle3 = d.getHours()*Math.PI/6+angle2*Math.PI/42;
//angle = 0.00;
//angle2 = 0.00;
//angle3 = 0.00;
minuteHand = new Image();
minuteHand.src = "minuteHand.png";
clock = new Image();
clock.src = "clock.png";
minuteHand.addEventListener('load',()=>{
  setInterval(animate,1000);
})

function animate() {
  angle += Math.PI/30;
  angle2 += Math.PI/1800;
  angle3 += Math.PI/21600;
  context.clearRect(0,0,width,height);
  context.drawImage(clock, 100, 100, 400, 400);
  context.save();
  context.translate(300,300);
  context.rotate(angle);
  context.drawImage(minuteHand, -225, -225, 450, 450);
  context.restore();
  context.save();
  context.translate(300,300);
  context.rotate(angle2);
  context.drawImage(minuteHand, -225, -225, 450, 450);
  context.restore();
  context.save();
  context.translate(300,300);
  context.rotate(angle3);
  context.drawImage(minuteHand, -150, -150, 300, 300);
  context.restore();
}
