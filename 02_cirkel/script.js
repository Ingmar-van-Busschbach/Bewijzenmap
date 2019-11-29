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
spawnCircle();
function spawnCircle() {
    setTimeout(function(){
        var whiteColors = ["#999999", "#888888", "#777777", "#666666", "#555555", "#444444", "#333333", "#222222" ,"#111111", "#000000", "#aaaaaa", "#bbbbbb", "#cccccc", "#dddddd", "#eeeeee", "#ffffff"];
        var rdx = Math.floor(Math.random() * 1536);
        var rdy = Math.floor(Math.random() * 754);
        var rdc = Math.floor(Math.random() * 16);
        var rda = Math.floor(Math.random() * 50);
        var rdb = Math.floor(Math.random() * 3.14);

        context.beginPath()
        context.lineWidth = rda;
        context.fillStyle = whiteColors[rdc];
        context.arc(rdx, rdy, 20, rdb, Math.PI*2-rdb);
        context.stroke();
        context.fill();
        spawnCircle();
    }, 100);
}
