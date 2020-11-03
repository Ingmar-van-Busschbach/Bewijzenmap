class Vector
{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}

	Length() {
		return Math.sqrt(this.x*this.x+this.y*this.y);
	}

	Normalize() {
		let length = this.Length();
		if(length==0||length==-0){length=1;}
		this.x = this.x / length;
		this.y = this.y / length;
	}

	ClampLength(maxLength) {
		let length = this.Length();
		let ratio = length / maxLength;
		if(ratio>1) {
			this.x = this.x / ratio;
			this.y = this.y / ratio;
		}
	}

	GetNormalized() {
		let length = Length();
		return new Vector(this.x / length,this.y / length);
	}

	DotProduct(vector) {
		return this.x * vector.x + this.y * vector.y;
	}

	DistanceTo(vector) {
		return Math.sqrt(Math.pow(vector.x-this.x, 2) + Math.pow(vector.y-this.y, 2));
	}

	EqualsVector(v) {
		return this.x==v.x&&this.y==v.y;
	}
}

function VectorPlusVector(va, vb){
	return new Vector(va.x+vb.x, va.y+vb.y);
}

function VectorMinVector(va, vb){
	return new Vector(va.x-vb.x, va.y-vb.y);
}

function VectorMultVector(va, vb){
	return new Vector(va.x*vb.x, va.y*vb.y);
}

function VectorMultFloat(va, fb){
	return new Vector(va.x*fb, va.y*fb);
}

function InvertVector(va){
	return new Vector(-va.x, -va.y);
}

function VectorEqualsVector(va,vb) {
	return va.x==vb.x&&va.y==vb.y;
}
