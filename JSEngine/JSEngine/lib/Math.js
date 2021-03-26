/*
function returning a random number between a min and a maximum value
*/

function RandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function RandomFloat(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Q_rsqrt(x, itterations = 1) // Quakes fast inverted square root algorithm. Mainly used for normalization of vectors
{ // Normally this algorithm is intended for C or C++, but this is a JS implementation. Much faster than inverted square root even in JS
    let i;
    let x2, y;
    const threehalfs = 1.5;

    x2 = x * 0.5;
    y = x; // Save x for later as it will get modified
    let buffer = new ArrayBuffer(4);
    (new Float32Array(buffer))[0] = x; // Bit manipulation to turn a float into a integer without changing the binary behind it
    i =  (new Uint32Array(buffer))[0]; // This is needed as the calculation next line only works with an integer
    i = (0x5f3759df - (i >> 1)); // This hex number is a compact leftover result calculated from how a inverted square root of any number actually modifies that number
    (new Uint32Array(buffer))[0] = i; // Convert integer back to float
    y = (new Float32Array(buffer))[0];
    for(i = 0; i < itterations; i++){ // This is effectively a triangulation method. Each time, a triangle is drawn inside of the previous triangle, drastically increasing accuracy every time
      y  = y * ( threehalfs - ( x2 * y * y ) ); // But the accuration is already ~99% after the first itteration, so a second itteration is rarely needed
    }

    return y;
}

function Clamp(x, min, max){
  if(x < min) { x = min; }
  if(x > max) { x = max; }
  return x;
}

function ABS(x){
  return Math.abs(x);
}

function IsBetween(x, min, max, include = true){
  if(include){
    if(x>=min && x<=max){
      return true;
    }
  }
  else{
    if(x>min && x<max){
      return true;
    }
  }
  return false;
}
