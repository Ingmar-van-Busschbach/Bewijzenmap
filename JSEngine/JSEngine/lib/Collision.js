//Automatically determines collision type dependon on collision ID of both objects
class CollisionResult{
  constructor(collides, overlapVector2D = new Vector2D(0,0), willCollide = false) {
    this.collides = collides;
    this.overlapVector2D = overlapVector2D;
    this.willCollide = willCollide;
  }
}

function CheckCollision(object1,object2,velocity = new Vector2D(0,0),useMathLine=false){
  let CollisionResult = new CollisionResult(false);
  switch(object1.id){
  case -1:
    console.log("one or more objects has collision disabled");
    return CollisionResult;
  case 0:
    if(object2.id==-1){console.log("one or more objects has collision disabled");return CollisionResult;}
	  if(object2.id==0){return BoxCollision(object1,object2,velocity);}
	  if(object2.id==1){return BoxCircleCollision(object1,object2,velocity);}
	  if(object2.id==2){return BoxSATCollision(object1,object2,velocity);}
	break;
  case 1:
    if(object2.id==-1){console.log("one or more objects has collision disabled");return CollisionResult;}
	  if(object2.id==0){return BoxCollision(object2,object1,velocity);}
	  if(object2.id==1){return CircleCollision(object1,object2,velocity);}
	  if(object2.id==2){return CircleSATCollision(object1,object2,velocity,useMathLine);}
	break;
  case 2:
    if(object2.id==-1){console.log("one or more objects has collision disabled");return CollisionResult;}
	  if(object2.id==0){return BoxSATCollision(object2,object1,velocity);}
	  if(object2.id==1){return CircleSATCollision(object2,object1,velocity,useMathLine);}
	  if(object2.id==2){return SATCollision(object1,object2,velocity,useMathLine);}
	break;
  default:
  console.log("one or more objects is missing collision setup. Please add collsion ID's to your object!");
	return CollisionResult;
  }
}

//simple rectangle/box collision
function BoxCollision(rect1,rect2,velocity = new Vector2D(0,0)){
  let CollisionResult = new CollisionResult(false);
  if(velocity.Length()>0){
    let x = rect1.x+velocity.x;
    let y = rect1.y+velocity.y;

    if(x < rect2.x + rect2.w &&
      x + rect1.w > rect2.x &&
      y < rect2.y + rect2.h &&
      y + rect1.h > rect2.y)
    {
      let overlapX = Math.min((rect2.x+rect2.w-x),(x + rect1.w-rect2.x));
      let overlapY = Math.min((rect2.y + rect2.h-y),(y + rect1.h-rect2.y));
      CollisionResult.overlapVector2D = new Vector2D(overlapX,overlapY);
      CollisionResult.collides = true;
      CollisionResult.willCollide = true;
      return CollisionResult;
    }
  } else {
    if(rect1.x < rect2.x + rect2.w &&
      rect1.x + rect1.w > rect2.x &&
      rect1.y < rect2.y + rect2.h &&
      rect1.y + rect1.h > rect2.y)
    {
      let overlapX = Math.min((rect2.x+rect2.w-rect1.x),(rect1.x + rect1.w-rect2.x));
      let overlapY = Math.min((rect2.y + rect2.h-rect1.y),(rect1.y + rect1.h-rect2.y));
      CollisionResult.overlapVector2D = new Vector2D(overlapX,overlapY);
      CollisionResult.collides = true;
      return CollisionResult;
    }
  }
  return CollisionResult;
}

//simple circle/sphere collision
function CircleCollision(circle1, circle2,velocity = new Vector2D(0,0)){
  let CollisionResult = new CollisionResult(false);
  if(velocity.Length()>0){
    let x = circle1.x+velocity.x;
    let y = circle1.y+velocity.y;
    let dx = x - circle2.x;
    let dy = y - circle2.y;
    let dr = Math.sqrt(dx * dx + dy * dy);
    if(dr < circle1.r + circle2.r) {
      let overlapRatio = (circle1.r+circle2.r)/dr;
      CollisionResult.overlapVector2D = new Vector2D((dx*overlapRatio)-dx,(dy*overlapRatio)-dy);
      CollisionResult.collides = true;
      return CollisionResult;
    }
  } else {
    let dx = circle1.x - circle2.x;
    let dy = circle1.y - circle2.y;
    let dr = Math.sqrt(dx * dx + dy * dy);
    if(dr < circle1.r + circle2.r) {
      let overlapRatio = (circle1.r+circle2.r)/dr;
      CollisionResult.overlapVector2D = new Vector2D((dx*overlapRatio)-dx,(dy*overlapRatio)-dy);
      CollisionResult.collides = true;
      return CollisionResult;
    }
  }
  return CollisionResult;
}

function BoxCircleCollision(rect,circle,velocity = new Vector2D(0,0)){
  let CollisionResult = new CollisionResult(false);
  let distX = Math.abs(circle.x - rect.x-rect.w/2);
  let distY = Math.abs(circle.y - rect.y-rect.h/2);

  if (distX > (rect.w/2 + circle.r)) { return CollisionResult; }
  if (distY > (rect.h/2 + circle.r)) { return CollisionResult; }

  if (distX <= (rect.w/2)) {
    CollisionResult.overlapVector2D = new Vector2D(rect.w/2,0);
    CollisionResult.collides = true;
    return CollisionResult;
  }
  if (distY <= (rect.h/2)) {
    CollisionResult.overlapVector2D = new Vector2D(0,rect.h/2);
    CollisionResult.collides = true;
    return CollisionResult;
  }

  let dx=distX-rect.w/2;
  let dy=distY-rect.h/2;
  let dr=dx*dx+dy*dy;
  if(dr<=(circle.r*circle.r))
  {
    let overlapRatio = (circle1.r+circle2.r)/dr;
    CollisionResult.overlapVector2D = new Vector2D((dx*overlapRatio)-dx,(dy*overlapRatio)-dy);
    CollisionResult.collides = true;
    return CollisionResult;
  }
  return CollisionResult;
}

function SATCollision(convex1,convex2,velocity=new Vector2D(0,0),useMathLine){
  let CollisionResult = new CollisionResult(true, new Vector2D(0,0), true);
	let edgeCountA = convex1.edges.length;
	let edgeCountB = convex2.edges.length;
  let minIntervalDistance = 1000000;
	let translationAxis = new Vector2D(0,0);
	let edge = new Vector2D(0,0);

  for(i=0; i<edgeCountA+edgeCountB; i++){
		if(i<edgeCountA){
			edge = convex1.edges[i];
      //console.log(edge);
		}
		else{
			edge = convex2.edges[i-edgeCountA];
      //console.log(edge);
		}

		let axis = new Vector2D(-edge.y, edge.x);
    //console.log(axis);
    axis.Normalize();
    //console.log(axis);
    let minmaxA = new Vector2D(0,0);
    let minmaxB = new Vector2D(0,0);
		minmaxA = ProjectSAT(axis, convex1);
		minmaxB = ProjectSAT(axis, convex2);
    //console.log(minmaxA.x);

		if(IntervalDistance(minmaxA.x,minmaxA.y,minmaxB.x,minmaxB.y)>0){
			CollisionResult.collides = false;
		}

    let velocityProjection = axis.DotProduct(velocity);
    //console.log(velocityProjection);
    if(velocityProjection<0){
      minmaxA.x += velocityProjection;
    } else {
      minmaxA.y += velocityProjection;
    }

    let intervalDistance = IntervalDistance(minmaxA.x,minmaxA.y,minmaxB.x,minmaxB.y);
    if(intervalDistance>0){
      CollisionResult.willCollide = false;
    }
    if(!CollisionResult.collides&&!CollisionResult.willCollide) {break;};

    intervalDistance = Math.abs(intervalDistance);
    if(intervalDistance<minIntervalDistance){
      minIntervalDistance = intervalDistance;
      translationAxis = axis;

      let d = new Vector2D(convex1.location-convex2.location);
      if(d.DotProduct(translationAxis)<0) {translationAxis = -translationAxis;}
    }
	}
  if(CollisionResult.willCollide){CollisionResult.overlapVector2D = Vector2DMultFloat(translationAxis,minIntervalDistance)};
  if(CollisionResult.collides && useMathLine){
    CollisionResult.collides = LinearLineCollision(convex1, convex2,velocity,CollisionResult).collides;
    CollisionResult.willCollide = LinearLineCollision(convex1, convex2,velocity,CollisionResult).collides;
  }
  return CollisionResult;
}

//turns box into convex for convex on convex collision
function BoxSATCollision(box,convex1,velocity = new Vector2D(0,0)){
	let pointArray = [new Vector2D(box.x, box.y),new Vector2D(box.x+box.w,box.y),new Vector2D(box.x+box.w, box.y+box.h),new Vector2D(box.x,box.y+box.h)];
	let convex2 = new Convex(new Vector2D(box.x+box.w/2,box.y+box.h/2), pointArray, true);
  return SATCollision(convex1, convex2,velocity,false);
}

//turns circle into simplified convex by sampling points every angleToSample, for convex on convex collision
function CircleSATCollision(circle,convex1,velocity = new Vector2D(0,0),useMathLine){
	let angleToSample = 45; //angle interval at which the code samples. Should be 10, 20, 30, 45 or 60.
	let pointArray = [];
	for(i=0; i<Math.round(360/angleToSample); i++){
		let point = new Vector2D(circle.r*Math.sin(Math.PI*2*angle/360),circle.r*Math.cos(Math.PI*2*angle/360));
		pointArray.push(point);
	}
	let convex2 = new Convex(new Vector2D(cirlce.x, circle.y), pointArray, true);
  return SATCollision(convex1,convex2,velocity,useMathLine);
}

function LinearLineCollision(convex1, convex2,velocity,CollisionResult) {
  let intersectReturn = CollisionResult;
  intersectReturn.collides=false;
  let pointCountA = convex1.points.length;
	let pointCountB = convex2.points.length;
  let mathLine = new MathLine(1,1,new Vector2D(0,0),new Vector2D(0,0));
  let mathLine2 = new MathLine(1,1,new Vector2D(0,0),new Vector2D(0,0));
  for(let i=0; i<pointCountA; i++){
    let j = i+1;
    if(j>=pointCountA){j=0;}
    mathLine.ReEvaluate(convex1.points[i], convex1.points[j]);
    for(let k=0; k<pointCountB; k++){
      let l = k+1;
      if(l>=pointCountA){l=0;}
      mathLine2.ReEvaluate(convex2.points[k], convex2.points[l]);
      let intersect = CalcIntercept(mathLine.a, mathLine2.a, mathLine.b, mathLine2.b);
      let withinBounds = IntersectionWithinBounds(intersect.atPoint, convex1.points[i], convex1.points[j]);
      let withinBounds2 = IntersectionWithinBounds(intersect.atPoint, convex2.points[k], convex2.points[l]);
      if(intersect.intersects && withinBounds && withinBounds2){
        intersectReturn.collides=true;
        break;
      }
    }
  }
  return intersectReturn;
}

function IntervalDistance(minA,maxA,minB,maxB){
	if(minA<minB){
		return minB-maxA;
	}
	else {
		return minA-maxB;
	}
}

function ProjectSAT(axis, convex){ //Seperate Axis Theorem
	let d = axis.DotProduct(convex.points[0]);
	let min = d;
	let max = d;
  convex.points.forEach((point, index) => {
    d = point.DotProduct(axis);
    if(d<min){
			min = d;
		}
		else if(d>max){
			max = d;
		}
  });
  return new Vector2D(min, max);
}
