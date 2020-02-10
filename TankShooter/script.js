// Get canvas from HTML.
const canvas = document.getElementById('canvas');

// Get a 2d contect on the canvas.
const context = canvas.getContext('2d');

// --- Declare Data ---
// Declare Screen Size.
const width = window.innerWidth;
const height = window.innerHeight;
canvas.width = width;
canvas.height = height - 10;

let playerState = 0;

let moveVertical = false;

let moveUp = false;
let moveDown = false;
let moveLeft = false;
let moveRight = false;
let moveUp2 = false;
let moveDown2 = false;
let moveLeft2 = false;
let moveRight2 = false;

let shotSize = 10.0;
let tankSizeX = 50.0;
let tankSizeY = 40.0;
let gravity = 0.0982;
let health = 10;

let shotArray = [];
let tankArray = [];

document.addEventListener('keydown', function(event) {
  if (event.keyCode == 87) {
    console.log(event.keyCode);
    moveDown = false;
    moveUp = true;
  }
  if (event.keyCode == 83) {
    console.log(event.keyCode);
    moveUp = false;
    moveDown = true;
  }
  if (event.keyCode == 65) {
    console.log(event.keyCode);
    moveRight = false;
    moveLeft = true;
  }
  if (event.keyCode == 68) {
    console.log(event.keyCode);
    moveLeft = false;
    moveRight = true;
  }
  if (event.keyCode == 38) {
    console.log(event.keyCode);
    moveDown2 = false;
    moveUp2 = true;
  }
  if (event.keyCode == 40) {
    console.log(event.keyCode);
    moveUp2 = false;
    moveDown2 = true;
  }
  if (event.keyCode == 37) {
    console.log(event.keyCode);
    moveRight2 = false;
    moveLeft2 = true;
  }
  if (event.keyCode == 39) {
    console.log(event.keyCode);
    moveLeft2 = false;
    moveRight2 = true;
  }
  if (event.keyCode == 32) {
    console.log(event.keyCode);
    playerState++;
    if (playerState == 2) shoot(tankArray[0].aimX, tankArray[0].aimY, (tankArray[0].aimX - tankArray[0].tankX) / 10, (tankArray[0].aimY - tankArray[0].tankY) / 10, 1);
    if (playerState == 5) shoot(tankArray[1].aimX, tankArray[1].aimY, (tankArray[1].aimX - tankArray[1].tankX) / 10, (tankArray[1].aimY - tankArray[1].tankY) / 10, 0);
    if (playerState == 6) playerState = 0;
  }
});

document.addEventListener("keyup", event => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  }
  moveUp = false;
  moveDown = false;
  moveLeft = false;
  moveRight = false;
  moveUp2 = false;
  moveDown2 = false;
  moveLeft2 = false;
  moveRight2 = false;
});

function tank(x, y) {
  this.tankX = x;
  this.tankY = y;
  this.aimX = x + tankSizeX / 2;
  this.aimY = y + tankSizeY / 2;
  this.health = health;

  this.drawPlayer1 = function(playerIndex) {
    context.beginPath();
    context.fillStyle = "#ffffff";
    context.rect(this.tankX, this.tankY, tankSizeX, tankSizeY);
    context.closePath();
    context.fill();

    context.beginPath();
    context.strokeStyle = "#dddddd";
    context.lineWidth = 10;
    context.moveTo(this.tankX + tankSizeX / 2, this.tankY);
    context.lineTo(this.aimX, this.aimY);
    context.stroke();
    context.closePath();

    if (playerState == playerIndex && moveUp == true && moveVertical) this.tankY--;
    if (playerState == playerIndex && moveDown == true && moveVertical) this.tankY++;
    if (playerState == playerIndex && moveLeft == true) this.tankX--;
    if (playerState == playerIndex && moveRight == true) this.tankX++;

    if (playerState == playerIndex) {
      this.aimX = this.tankX;
      this.aimY = this.tankY;
    }

    if (playerState == playerIndex + 1 && moveUp == true && this.aimY - this.tankY - tankSizeY / 2 > -100) this.aimY--;
    if (playerState == playerIndex + 1 && moveDown == true && this.aimY - this.tankY - tankSizeY / 2 < 10) this.aimY++;
    if (playerState == playerIndex + 1 && moveLeft == true && this.aimX - this.tankX - tankSizeX / 2 > -100) this.aimX--;
    if (playerState == playerIndex + 1 && moveRight == true && this.aimX - this.tankX - tankSizeX / 2 < 100) this.aimX++;
  }

  this.drawPlayer2 = function(playerIndex) {
    context.beginPath();
    context.fillStyle = "#ffffff";
    context.rect(this.tankX, this.tankY, tankSizeX, tankSizeY);
    context.closePath();
    context.fill();

    context.beginPath();
    context.strokeStyle = "#dddddd";
    context.moveTo(this.tankX + tankSizeX / 2, this.tankY);
    context.lineTo(this.aimX, this.aimY);
    context.stroke();

    if (playerState == playerIndex && moveUp2 == true && moveVertical) this.tankY--;
    if (playerState == playerIndex && moveDown2 == true && moveVertical) this.tankY++;
    if (playerState == playerIndex && moveLeft2 == true) this.tankX--;
    if (playerState == playerIndex && moveRight2 == true) this.tankX++;

    if (playerState == playerIndex) {
      this.aimX = this.tankX;
      this.aimY = this.tankY;
    }

    if (playerState == playerIndex + 1 && moveUp2 == true && this.aimY - this.tankY - tankSizeY / 2 > -100) this.aimY--;
    if (playerState == playerIndex + 1 && moveDown2 == true && this.aimY - this.tankY - tankSizeY / 2 < 10) this.aimY++;
    if (playerState == playerIndex + 1 && moveLeft2 == true && this.aimX - this.tankX - tankSizeX / 2 > -100) this.aimX--;
    if (playerState == playerIndex + 1 && moveRight2 == true && this.aimX - this.tankX - tankSizeX / 2 < 100) this.aimX++;
  }
}

function shot(x, y, dx, dy, targetIndex) {
  this.shotX = x;
  this.shotY = y;
  this.shotDX = dx;
  this.shotDY = dy;
  this.draw = function() {
    if (playerState == 2 || playerState == 5) {
      context.beginPath();
      context.fillStyle = "#ffffff";
      context.arc(this.shotX, this.shotY, shotSize, 0, Math.PI * 2, true);
      context.closePath();
      context.fill();

      this.shotDX = this.shotDX * 0.997;
      this.shotDY = this.shotDY * 0.997;
      this.shotDY += gravity;
      if (this.shotX < shotSize || this.shotX > width - shotSize) this.shotDX = -this.shotDX;
      if (this.shotY < shotSize || this.shotY > height - shotSize - 10) this.shotDY = -this.shotDY;
      this.shotX += this.shotDX;
      this.shotY += this.shotDY;

      if (this.shotX + shotSize > tankArray[targetIndex].tankX && this.shotX - shotSize < tankArray[targetIndex].tankX + tankSizeX && this.shotY + shotSize > tankArray[targetIndex].tankY && this.shotY - shotSize < tankArray[targetIndex].tankY + tankSizeY) {
        tankArray[targetIndex].health--;
        playerState++;
        if (playerState == 6) playerState = 0;
      }
    }
  }
}

function refresh() {
  setInterval(render, 5);
}

function render() {
  context.clearRect(0, 0, width, height);
  i = shotArray.length - 1;
  if (shotArray.length > 0) shotArray[i].draw();
  if(tankArray[0].health>0)tankArray[0].drawPlayer1(0);
  if(tankArray[1].health>0)tankArray[1].drawPlayer2(3);

  context.beginPath();
  context.font = "100px Arial";
  context.fillStyle = "#ffffff";
  context.fillText(tankArray[0].health + "-" + tankArray[1].health, width / 2 - 100, height / 2);
  context.closePath();
}

function shoot(x, y, dx, dy, targetIndex) {
  shotArray.push(new shot(x, y, dx, dy, targetIndex));
}
tankArray.push(new tank(100, height - 10 - tankSizeY));
tankArray.push(new tank(width - 100, height - 10 - tankSizeY));
refresh();
