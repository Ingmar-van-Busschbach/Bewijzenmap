
let mouseControl = false;
let moveVector = new Vector2d(0,0);
let moveVector2 = new Vector2d(0,0);
let moveUp = false;
let moveDown = false;
let moveUp2 = false;
let moveDown2 = false;
let moveLeft = false;
let moveRight = false;
let moveLeft2 = false;
let moveRight2 = false;
let key0 = false;
let key1 = false;
let key2 = false;
let key3 = false;
let key4 = false;
let key5 = false;

document.addEventListener('keydown', function(event) {
  // settings changer
  if (mouseControl == false) {
    if (event.keyCode == 87) {
      moveVector.dy = 1;
    }
    if (event.keyCode == 83) {
      moveVector.dy = -1;
    }
    if (event.keyCode == 65) {
      moveVector.dx = 1;
    }
    if (event.keyCode == 68) {
      moveVector.dx = -1;
    }
    if (event.keyCode == 38) {
      moveVector2.dy = 1;
    }
    if (event.keyCode == 40) {
      moveVector2.dy = -1;
    }
    if (event.keyCode == 37) {
      moveVector2.dx = 1;
    }
    if (event.keyCode == 39) {
      moveVector2.dx = -1;
    }
    if (event.keyCode == 49) {
      key1 = true;
    }
    if (event.keyCode == 50) {
      key2 = true;
    }
    if (event.keyCode == 51) {
      key3 = true;
    }
    if (event.keyCode == 52) {
      key4 = true;
    }
    if (event.keyCode == 53) {
      key5 = true;
    }
    if (event.keyCode == 48) {
      key0 = true;
    }
  }
});

document.addEventListener("keyup", event => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  }
  if (event.keyCode == 87 && event.keyCode == 83) {
    moveVector.dy = 0;
  }
  if (event.keyCode == 65 && event.keyCode == 68) {
    moveVector.dx = 0;
  }
  if (event.keyCode == 38 && event.keyCode == 40) {
    moveVector2.dy = 0;
  }
  if (event.keyCode == 37 && event.keyCode == 39) {
    moveVector2.dx = 0;
  }
  if (event.keyCode == 49) {
    key1 = false;
  }
  if (event.keyCode == 50) {
    key2 = false;
  }
  if (event.keyCode == 51) {
    key3 = false;
  }
  if (event.keyCode == 52) {
    key4 = false;
  }
  if (event.keyCode == 53) {
    key5 = false;
  }
  if (event.keyCode == 48) {
    key0 = false;
  }
});
