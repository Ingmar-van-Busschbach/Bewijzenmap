//2400  -  960
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const width = window.innerWidth;
const height = window.innerHeight/1.5;

canvas.width = width;
canvas.height = height;

let DiceRolls = [];
for (let i = 0; i < 12; i++) DiceRolls[i] = 0;
let Dice = new Image();
Dice.src = "Dice.png"

document.addEventListener("keyup", function (e) {
  if (e.keyCode == 32) {
      Update()
      UpdateScores()
  }
})

function Update() {
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;
    let throwResult = dice1 + dice2;
    DiceRolls[throwResult-1] += 1;
    context.clearRect(0, 0, height, width);
    context.drawImage(Dice, 0 + (dice1 * (Dice.width/6) - (Dice.width/6)), 0, Dice.width/6, Dice.height, 50, 50, 100, 100)
    context.drawImage(Dice, 0 + (dice2 * (Dice.width/6) - (Dice.width/6)), 0, Dice.width/6, Dice.height, 200, 50, 100, 100)
}


function Loop(Ammount) {
    for (let i = 0; i < Ammount; i++) {
        Update();
        UpdateScores();
    }
}

function UpdateScores() {
    document.getElementById("Two").innerHTML = DiceRolls[1];
    document.getElementById("Three").innerHTML = DiceRolls[2];
    document.getElementById("Four").innerHTML = DiceRolls[3];
    document.getElementById("Five").innerHTML = DiceRolls[4];
    document.getElementById("Six").innerHTML = DiceRolls[5];
    document.getElementById("Seven").innerHTML = DiceRolls[6];
    document.getElementById("Eight").innerHTML = DiceRolls[7];
    document.getElementById("Nine").innerHTML = DiceRolls[8];
    document.getElementById("Ten").innerHTML = DiceRolls[9];
    document.getElementById("Eleven").innerHTML = DiceRolls[10];
    document.getElementById("Twelve").innerHTML = DiceRolls[11];
}

document.getElementById("loop").addEventListener("click", function () {
    let loopCount = document.getElementById("loopCount").value;
   if (!Number.isInteger(Number.parseInt(loopCount))) {
       console.log("Geen number:   " + loopCount)
       return;
   }
   let loopAmount = Number.parseInt(document.getElementById("loopCount").value)
   Loop(loopAmount);
});
