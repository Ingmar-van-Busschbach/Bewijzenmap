const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

const bullets = [];
const collisionHandler = new CollisionHandler();
const walls = [];

let WisPressed = false;
let AisPressed = false;
let SisPressed = false;
let DisPressed = false;

let ArrowUp = false;
let ArrowDown = false;
let ArrowRight = false;
let ArrowLeft = false;

canvas.width = width;
canvas.height = height;

let Player = {};
Player.angle = 0;
Player.AnimationCount = 8;
Player.location = new Vector2d(width / 2, height / 2);
Player.previousLocation = new Vector2d(width / 2, height / 2);
Player.direction = 'forward';

let Player2 = {};
Player2.angle = 0;
Player2.AnimationCount = 16;
Player2.location = new Vector2d(width / 2, height / 2 + 100)
Player2.previousLocation = new Vector2d(width / 2, height / 2);
Player2.direction = 'forward';

let sheet = new Image();
sheet.addEventListener("load", init);
sheet.src = "images/spriteSheet.png"

let spriteRenderer = new SpriteSheetRenderer(sheet, 8, 4, 32);

function init() {
    setInterval(update, 1);
    createWalls();
}

function createWalls() {
    for (let x = 0; x < width / (sheet.width / 8); x++) {
        createWall(x * sheet.width/8, 0, sheet.width/8, sheet.height/4);
        createWall(x * sheet.width/8, height-sheet.height/4, sheet.width/8, sheet.height/4);
    }

    for (let y = 1; y < height / (sheet.height / 4); y++) {
        createWall(0, y * sheet.height/4, sheet.width/8, sheet.height/4);
        createWall(width-sheet.width/8, y * sheet.height/4, sheet.width/8, sheet.height/4);
    }

    function createWall(x,y,width,height) {
        let wall = {};
        wall.x = x;
        wall.y = y;
        wall.w = width;
        wall.h = height;
        walls.push(wall);
    }
}

function update() {
    context.clearRect(0, 0, width, height);

    DrawBackground();
    DrawWalls();

    MoveBullets();
    DrawBullets();

    PlayerMovement();
    DrawPlayers();
}

function DrawBackground() {
    for (let x = 0; x < width / (sheet.width / 8); x++) {
        for (let y = 0; y < height / (sheet.height / 4); y++) {
            spriteRenderer.DrawSprite(context, x * sheet.width / 8, y * sheet.height / 4, 0);
        }
    }
}

function DrawWalls() {
    for (let i = 0; i < walls.length; i++) {
        spriteRenderer.DrawSprite(context, walls[i].x, walls[i].y, 26);
    }
}

function MoveBullets() {
    for (let i = 0; i < bullets.length; i++) {
        let bullet = bullets[i];
        bullet.x += 1.5 * Math.sin(bullet.angle);
        bullet.y -= 1.5 * Math.cos(bullet.angle);
    }
}

function DrawBullets() {
    for (let i = 0; i < bullets.length; i++) {
        let bullet = bullets[i];

        let data = spriteRenderer.GetDrawSpriteData(20);
        context.save();
        context.translate(bullet.x, bullet.y);
        context.rotate(bullet.angle);
        context.drawImage(sheet, data.sx, data.sy, data.sWidth, data.sHeight, -data.sWidth / 2, -data.sHeight / 2, data.dWidth, data.dHeight);
        context.fillRect(-data.sWidth / 2 + data.sWidth / 3, -data.sHeight / 2 + data.sHeight / 5, data.dWidth / 3, data.dHeight / 1.5);
        context.stroke();
        context.restore();
    }
}

function PlayerMovement() {
    Player.previousLocation.dx = Player.location.dx;
    Player.previousLocation.dy = Player.location.dy;

    if (WisPressed) {
        Player.location.dy -= 0.5 * Math.cos(Player.angle);
        Player.location.dx += 0.5 * Math.sin(Player.angle);
        Player.direction = "forward";
    } else if (SisPressed) {
        Player.location.dy += 0.5 * Math.cos(Player.angle);
        Player.location.dx -= 0.5 * Math.sin(Player.angle);
        Player.direction = "backwards";
    }

    let canMove = true;
    walls.forEach(wall => {
        let playerX = Player.location.dx + (sheet.width / 8 * 2);
        let playerY = Player.location.dy + (sheet.height/4 * 2);
        let playerR = 0;
        if (collisionHandler.circleRect(playerX,playerY, playerR, wall.y, wall.w, wall.h)) {
            canMove = false;
        }
    });

    console.log(canMove);

    if (AisPressed) {
        Player.angle -= 0.01;
    } else if (DisPressed) {
        Player.angle += 0.01;
    }


    Player2.previousLocation.dx = Player2.location.dx;
    Player2.previousLocation.dy = Player2.location.dy;

    if (ArrowUp) {
        Player2.location.dy -= 0.5 * Math.cos(Player2.angle);
        Player2.location.dx += 0.5 * Math.sin(Player2.angle);
        Player2.direction = "forward";
    } else if (ArrowDown) {
        Player2.location.dy += 0.5 * Math.cos(Player2.angle);
        Player2.location.dx -= 0.5 * Math.sin(Player2.angle);
        Player2.direction = "backwards";
    }
    if (ArrowLeft) {
        Player2.angle -= 0.01;
    } else if (ArrowRight) {
        Player2.angle += 0.01;
    }
}

function DrawPlayers() {
    let Animation = Math.floor(Player.AnimationCount);
    if (Player.location.distanceTo(Player.previousLocation) > 0.1) {
        if (Player.direction === "forward") {
            Animation = Math.floor(Player.AnimationCount -= 0.05);
        } else {
            Animation = Math.floor(Player.AnimationCount += 0.05);
        }
    }
    if (Animation < 1) {
        Animation = 1;
        Player.AnimationCount = 9;
    }
    if (Animation > 8) {
        Animation = 8;
        Player.AnimationCount = 1;
    }

    let data = spriteRenderer.GetDrawSpriteData(Animation);
    context.save();
    context.translate(Player.location.dx, Player.location.dy);
    context.rotate(Player.angle);
    context.drawImage(sheet, data.sx, data.sy, data.sWidth, data.sHeight, -data.sWidth / 2, -data.sHeight / 2, data.dWidth, data.dHeight);
    context.restore();

    let Animation2 = Math.floor(Player2.AnimationCount);
    if (Player2.location.distanceTo(Player2.previousLocation) > 0.1) {
        if (Player2.direction === "forward") {
            Animation2 = Math.floor(Player2.AnimationCount -= 0.05);
        } else {
            Animation2 = Math.floor(Player2.AnimationCount += 0.05);
        }
    }
    if (Animation2 < 9) {
        Animation2 = 9;
        Player2.AnimationCount = 17;
    }
    if (Animation2 > 16) {
        Animation2 = 16;
        Player2.AnimationCount = 10;
    }

    let data2 = spriteRenderer.GetDrawSpriteData(Animation2);
    context.save();
    context.translate(Player2.location.dx, Player2.location.dy);
    context.rotate(Player2.angle);
    context.drawImage(sheet, data2.sx, data2.sy, data2.sWidth, data2.sHeight, -data2.sWidth / 2, -data2.sHeight / 2, data2.dWidth, data2.dHeight)
    context.restore();
}

// get user input
document.addEventListener("keydown", (e) => {
    switch (e.key.toString().toLowerCase()) {
        case "w":
            WisPressed = true;
            break;
        case "a":
            AisPressed = true;
            break;
        case "s":
            SisPressed = true;
            break;
        case "d":
            DisPressed = true;
            break;
        case "arrowup":
            ArrowUp = true;
            break;
        case "arrowdown":
            ArrowDown = true;
            break;
        case "arrowleft":
            ArrowLeft = true;
            break;
        case "arrowright":
            ArrowRight = true;
            break;
    }
});
document.addEventListener("keyup", (e) => {
    switch (e.key.toString().toLowerCase()) {
        case "w":
            WisPressed = false;
            break;
        case "a":
            AisPressed = false;
            break;
        case "s":
            SisPressed = false;
            break;
        case "d":
            DisPressed = false;
            break;
        case "arrowup":
            ArrowUp = false;
            break;
        case "arrowdown":
            ArrowDown = false;
            break;
        case "arrowleft":
            ArrowLeft = false;
            break;
        case "arrowright":
            ArrowRight = false;
            break;
    }
});

document.addEventListener("mousedown", (e) => {
    let mouseX = e.clientX;
    let mouseY = e.clientY;

    // instantiate bullet.
});

canvas.addEventListener("mousemove", function (e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
    document.title = "X: " + mouseX + "  Y" + mouseY;
});

