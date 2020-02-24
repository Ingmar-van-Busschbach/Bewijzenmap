/*
function returning a random number between a min and a maximum value
*/

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makePositive(input) {
    return Math.abs(input);
}

function sinusWave(index) {
  return ((2* Math.sin(index / 100)) + (2* Math.cos(index / 100))) / 10;
}
