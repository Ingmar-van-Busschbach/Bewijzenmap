class RGBColor {
  constructor(r, g, b){
    this.r = r;
    this.g = g;
    this.b = b;
  }

  Plus(rgbColor){
    this.r += rgbColor.r;
    this.g += rgbColor.g;
    this.b += rgbColor.b;
  }
  Min(rgbColor){
    this.r -= rgbColor.r;
    this.g -= rgbColor.g;
    this.b -= rgbColor.b;
  }
  Mult(rgbColor){
    this.r *= rgbColor.r;
    this.g *= rgbColor.g;
    this.b *= rgbColor.b;
  }

  ToColor(){
    return "rgb("+this.r+","+this.g+","+this.b+")";
  }
  Randomize(){
    this.r = Math.floor(Math.random() * 125)+125;
    this.g = Math.floor(Math.random() * 125)+125;
    this.b = Math.floor(Math.random() * 125)+125;
  }
}

function RandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function RandomRGB() {
  return new RGBColor(Math.floor(Math.random() * 125)+125, Math.floor(Math.random() * 125)+125, Math.floor(Math.random() * 125)+125);
}

function HexToRGB(hex){
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
  if(result != null){
    return new RGBColor(result.r, result.g, result.b);
  }
  return new RGBColor(255,255,255);
}
