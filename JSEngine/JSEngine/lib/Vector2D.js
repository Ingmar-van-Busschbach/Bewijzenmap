// Written by Ingmar van Busschbach

class Vector2D
{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}

	// Float returns
	Length() { return Math.sqrt(this.x*this.x+this.y*this.y);
	}
	Dot(Vector2D) { return this.x * Vector2D.x + this.y * Vector2D.y; // Dot product
	}
	Cross(Vector2D) { return this.x * Vector2D.y - this.y * Vector2D.x; // Cross product. Less usefull in 2D but is included
	}
	Distance(Vector2D) { return Math.sqrt(Math.pow(Vector2D.x - this.x, 2) + Math.pow(Vector2D.y-this.y, 2));
	}
	Slope(Vector2D) { return (Vector2D.y - this.y)/(Vector2D.x - this.x); // Also functions as angle
	}

	// Simple vector modifiers
	Plus(Vector2D) { this.x += Vector2D.x; this.y += Vector2D.y;
	}
	Min(Vector2D) { this.x -= Vector2D.x; this.y -= Vector2D.y;
	}
	Mult(Vector2D) { this.x *= Vector2D.x; this.y *= Vector2D.y;
	}
	MultF(float) { this.x *= float; this.y *= float; // Multiply by float
	}
	Div(Vector2D) { this.x /= Vector2D.x; this.y /= Vector2D.y;
	}
	DivF(float) { this.x /= float; this.y /= float; // Divide by float
	}
	Square() { this.x *= this.x; this.y *= this.y;
	}
	Invert(){ this.x *= -1; this.y *= -1;
	}
	Perpendicular(){ this.y *= -1;
	}
	// Complex vector modifiers
	Equals(Vector2D, margin = 0) {
		if(margin != 0){
			let x = Math.abs(this.x - Vector2D.x);
			let y = Math.abs(this.y - Vector2D.y);
			return x <= margin && y <= margin;
		}
		return this.x==Vector2D.x&&this.y==Vector2D.y;
	}
	Normalize() { // Slow. Use FastNormalize() if you don't need perfect accuracy
		let length = this.Length();
		if(length==0||length==-0){length=1;}
		this.x = this.x / length;
		this.y = this.y / length;
	}
	FastNormalize(itterations = 1){ // Uses QUake's fast inverted square root algorithm. See Math.js for the function
		let ratio = Q_rsqrt(this.x*this.x+this.y*this.y, itterations); // In most cases, 1 iterration gives enough (99%) accuracy
		this.x = this.x * ratio;
		this.y = this.y * ratio;
	}
	Clamp(maxLength) {
		let length = this.Length();
		let ratio = length / maxLength;
		if(ratio>1) {
			this.x = this.x / ratio;
			this.y = this.y / ratio;
		}
	}
	Rotate(angle) {
		let theta = angle * Math.PI / 180; // Convert angle from degrees to radials
		let ca = Math.cos(theta);
		let sa = Math.sin(theta);
		let x = ca*this.x - sa*this.y;
		let y = sa*this.x + ca*this.y;
		this.x = x;
		this.y = y;
	}

	// Draws the vector as a simple line
	Draw(context, location, scale = 1, color = "white") {
		context.fillStyle = color;

		context.beginPath();
		context.moveTo(location.x, location.y);
		context.lineTo(location.x + this.x, location.y + this.y);
		context.closePath();
		context.stroke();
		context.fill();
	}

	// Draws the vector in the shape of an arrow
	DrawAdv(context, location, scale =1, color = "white"){
		let shaftHeight = 10;
		let arrowHeight = 20;
		let arrowWidth = 40;
		let shaftWidth = this.magnitude*scale - arrowWidth;
		context.fillStyle = color;

		context.save();
		context.translate(location.x,location.y);
		context.rotate(this.angle)

		context.beginPath();
		context.moveTo(0,0);
		context.lineTo(0,shaftHeight/2);
		context.lineTo(shaftWidth,shaftHeight/2);
		context.lineTo(shaftWidth,arrowHeight/2);
		context.lineTo(shaftWidth + arrowWidth,0);
		context.lineTo(shaftWidth,-arrowHeight/2);
		context.lineTo(shaftWidth,-shaftHeight/2);
		context.lineTo(0,-shaftHeight/2);
		context.closePath();
		context.stroke();
		context.fill();

		context.restore();
	}
}

// Seperate function library that isn't connectted to the Vector2D class for extra flexibility
// Float retuns
function V2DLength(va) { return Math.sqrt(va.x*va.x+va.y*va.y);
}
function V2DDot(va, vb) { return va.x * vb.x + va.y * vb.y;
}
function V2DCross(va, vb) { return va.x * vb.y - va.y * vb.x;
}
function V2DDistance(va, vb) { return Math.sqrt(Math.pow(vb.x - va.x, 2) + Math.pow(vb.y-va.y, 2));
}
function V2DAngle(va, vb) { return (vb.y - va.y)/(vb.x - va.x);
}

// Simply vector returns
function V2DPlus(va, vb){ return new Vector2D(va.x + vb.x, va.y + vb.y);
}
function V2DMin(va, vb){ return new Vector2D(va.x - vb.x, va.y - vb.y);
}
function V2DMult(va, vb){ return new Vector2D(va.x * vb.x, va.y * vb.y);
}
function V2DMultF(va, float){ return new Vector2D(va.x * float, va.y * float);
}
function V2DDiv(va, vb) { return new Vector2D(va.x / vb.x, va.y / vb.y);
}
function V2DDivF(va, float) { return new Vector2D(va.x / float, va.y / float);
}
function V2DInvert(va){ return new Vector2D(-va.x, -va.y);
}
function V2DPerpendicular(va){ return new Vector2D(-va.y, va.x);
}

// Complex vector returns
function V2DEquals(va, vb, margin = 0) {
	if(margin != 0){
		let x = Math.abs(va.x - vb.x);
		let y = Math.abs(va.y - vb.y);
		return x <= margin && y <= margin;
	}
	return va.x==vb.x&&va.y==vb.y;
}
function V2DNormalize(va){ // Slow. Use FastNormalize() if you don't need perfect accuracy
	let length = va.Length();
	if(length==0||length==-0){length=1;}
	va.x = va.x / length;
	va.y = va.y / length;
	return va;
}
function V2DFastNormalize(va, itterations = 1){ // Uses QUake's fast inverted square root algorithm. See Math.js for the function
	let ratio = Q_rsqrt((va.x*va.x)+(va.y*va.y), itterations); // In most cases, 1 iterration gives enough (99%) accuracy
	va.x *= ratio;
	va.y *= ratio;
	return va;
}
function V2DClamp(va){
	let length = va.Length();
	let ratio = length / maxLength;
	if(ratio>1) {
		va.x = va.x / ratio;
		va.y = va.y / ratio;
	}
}
function V2DProjectOnPoint(va, vb) { //Project a vector, asumed to go from (0,0), onto a second vector, which also comes from (0,0)
	let length = V2DDot(va, vb) / (vb.Length() * vb.Length());
	return V2DMultF(vb, length);
}
function V2DResolve(va) { //Resolves a vector into two vectors, one being (x,0), the other being (0,y)
	let a = new Vector2D(va.x, 0);
	let b = new Vector2D(0, va.y);
	return [a,b];
}
function V2DResolveViaProjection(va, vb, itterations = 1) { //Resolves a vector into two vectors each perpendicular of each other, based on a projection vector.
	let perpendicular = V2DPerpendicular(vb);
	let length = V2DDot(va, vb) / (vb.Length() * vb.Length());
	let length2 = V2DDot(va, perpendicular) / (vb.Length() * vb.Length());
	let result = V2DMultF(vb, length);
	let result2 = V2DMultF(perpendicular, length2);
	return [result, result2];
}
function V2DRotate(va, angle) {
	let theta = angle * Math.PI / 180; // Convert angle from degrees to radials
	let ca = Math.cos(theta);
	let sa = Math.sin(theta);
	let x = ca*va.x - sa*va.y;
	let y = sa*va.x + ca*va.y;
	return new Vector2D(x, y);
}
