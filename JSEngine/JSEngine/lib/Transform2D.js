// Written by Ingmar van Busschbach

class Transform
{
	constructor(location, rotation, scale){
		this.location = location; // Is Vector3D or Vector2D
		this.rotation = rotation; // Is Euler in 3D, float in 2D
		this.scale = scale; // Is Vector3D, Vector2D or float
	}
}
