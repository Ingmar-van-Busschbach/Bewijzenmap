// maak een variabele voor de canvas
const canvas = document.getElementById('canvas');

// leg een 2d-context over de canvas
const context = canvas.getContext('2d');

//maak de canvas schermvullend
const width = window.innerWidth;
const height = window.innerHeight;
canvas.width = width;
canvas.height = height;


// hier kun je op de canvas tekenen
context.beginPath()
context.lineWidth = 3;
context.fillStyle = "red";
context.moveTo(300,100);
context.lineTo(700,200);
context.lineTo(600,400);
context.lineTo(200,300);
context.closePath();
context.stroke();
context.fill()

context.beginPath()
context.lineWidth = 3;
context.moveTo(700,200);
context.lineTo(200,300);
context.closePath();
context.stroke();
context.fill()

context.beginPath()
context.lineWidth = 3;
context.moveTo(300,100);
context.lineTo(600,400);
context.closePath();
context.stroke();
context.fill()

context.beginPath()
context.lineWidth = 3;
context.fillStyle = "grey";
context.moveTo(200,300);
context.lineTo(600,400);
context.lineTo(600,600);
context.lineTo(200,500);
context.closePath();
context.stroke();
context.fill()

context.beginPath()
context.lineWidth = 3;
context.fillStyle = "grey";
context.moveTo(600,400);
context.lineTo(800,300);
context.lineTo(800,500);
context.lineTo(600,600);
context.closePath();
context.stroke();
context.fill()

context.beginPath()
context.lineWidth = 3;
context.fillStyle = "grey";
context.moveTo(600,400);
context.lineTo(800,300);
context.lineTo(700,200);
context.closePath();
context.stroke();
context.fill()

context.beginPath()
context.lineWidth = 3;
context.moveTo(800,300);
context.lineTo(760,290);
context.closePath();
context.stroke();
context.fill()

context.beginPath()
context.lineWidth = 3;
context.moveTo(760,290);
context.lineTo(620,360);
context.closePath();
context.stroke();
context.fill()

context.beginPath()
context.lineWidth = 3;
context.moveTo(760,290);
context.lineTo(700,200);
context.closePath();
context.stroke();
context.fill()

context.beginPath()
context.lineWidth = 3;
context.fillStyle = "white";
context.moveTo(620,590);
context.lineTo(664,568);
context.lineTo(664,498);
context.lineTo(620,520);
context.closePath();
context.stroke();
context.fill()

context.beginPath()
context.lineWidth = 3;
context.fillStyle = "white";
context.moveTo(720,521);
context.lineTo(760,500);
context.lineTo(760,453);
context.lineTo(720,475);
context.closePath();
context.stroke();
context.fill()
