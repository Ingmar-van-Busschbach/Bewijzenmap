class RGBColor {
  constructor(r, g, b){
    this.r = r;
    this.g = g;
    this.b = b;
  }
  convertToColor(){
    return "rgb("+this.r+","+this.g+","+this.b+")";
  }
  combine(rgbColor){
    this.r = this.r * rgbColor.r;
    this.g = this.g * rgbColor.g;
    this.b = this.b * rgbColor.b;
  }
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomRGB() {
  var color = new RGBColor(Math.floor(Math.random() * 125)+125, Math.floor(Math.random() * 125)+125, Math.floor(Math.random() * 125)+125);
  return color;
}

function hexToRgbCalc(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function hexToRgb(hex){
  let result = hexToRgbCalc(hex);
  return new RGBColor(result.r, result.g, result.b);
}
