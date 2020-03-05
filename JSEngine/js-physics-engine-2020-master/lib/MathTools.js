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
  return ((2* Math.sin(index / 50)) + (2* Math.cos(index / 50))) / 50;
}

function Evaluate(x = this.x, formula = this.formula){
  let search = 'x';
  let formula2 = formula.toString();
  let result = eval(formula2.split(search).join(x.toString()));
  return result;
}

function GetSlope(pos1, pos2){
  let result = (pos2.dy - pos1.dy)/(pos2.dx - pos1.dx);
  return result;
}
function CalcIntercept(a1, a2, b1, b2){
  let x = 0;
  let y = 0;
  let bool = InterceptReturnBoolean(a1, a2, b1, b2);
  if(bool){
    x = InterceptReturnX(a1, a2, b1, b2);
    y = InterceptReturnY(x, a1, b1);
  }
  return[bool, x, y];
}
function InterceptReturnBoolean(a1, a2, b1, b2){
  if(a1 == a2) return false;
  let x = (b2-b1)/(a1-a2);
  if(x<0||x>width) return false;
  return true;
}
function InterceptReturnX(a1, a2, b1, b2){
  let x = (b2-b1)/(a1-a2);
  return x;
}
function InterceptReturnY(x, a, b){
  let y = a*x+b;
  return y;
}

/* function cartesian() {
    var r = [], arg = arguments, max = arg.length-1;
    function helper(arr, i) {
        for (var j=0, l=arg[i].length; j<l; j++) {
            var a = arr.slice(0); // clone arr
            a.push(arg[i][j]);
            if (i==max)
                r.push(a);
            else
                helper(a, i+1);
        }
    }
    helper([], 0);
    return r;
}
*/
