
let mouseControl = false;
let moveUp = false;
let moveDown = false;
let moveUp2 = false;
let moveDown2 = false;
let moveLeft = false;
let moveRight = false;
let moveLeft2 = false;
let moveRight2 = false;


document.addEventListener('mousemove', function(input) {
  if (mouseControl == true) y = input.pageY;;
});

document.addEventListener('keydown', function(event) {
  // settings changer
  if (mouseControl == false) {
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
