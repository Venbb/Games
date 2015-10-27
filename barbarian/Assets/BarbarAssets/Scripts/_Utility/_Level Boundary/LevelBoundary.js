#pragma strict

// Size of the level
var bounds : Rect;
var fallOutBuffer = 5.0;
var colliderThickness = 10.0;

// Sea Green For the Win!
private var sceneViewDisplayColor = Color (0.20, 0.74, 0.27, 0.50);

static private var instance : LevelBoundary;

static function GetInstance() {
	if (!instance) {
		instance = FindObjectOfType(LevelBoundary) as LevelBoundary;
		if (!instance)
			Debug.LogError("There needs to be one active LevelAttributes script on a GameObject in your scene.");
	}
	return instance;
}

function OnDisable () {
	instance = null;
}

function OnDrawGizmos () {
	Gizmos.color = sceneViewDisplayColor;
	var lowerLeft : Vector3 = Vector3 (bounds.xMin, bounds.yMax, 0);
	var upperLeft : Vector3 = Vector3 (bounds.xMin, bounds.yMin, 0);
	var lowerRight : Vector3 = Vector3 (bounds.xMax, bounds.yMax, 0);
	var upperRight : Vector3 = Vector3 (bounds.xMax, bounds.yMin, 0);
	
	Gizmos.DrawLine (lowerLeft, upperLeft);
	Gizmos.DrawLine (upperLeft, upperRight);
	Gizmos.DrawLine (upperRight, lowerRight);
	Gizmos.DrawLine (lowerRight, lowerLeft);
}

function Start () {
	var createdBoundaries : GameObject = new GameObject ("Created Boundaries");
	createdBoundaries.layer = this.gameObject.layer;
	createdBoundaries.transform.parent = transform;
	
	var leftBoundary : GameObject = new GameObject ("Left Boundary");
	leftBoundary.layer = createdBoundaries.layer;
	leftBoundary.transform.parent = createdBoundaries.transform;
	var boxCollider : BoxCollider = leftBoundary.AddComponent (BoxCollider) as BoxCollider;
	boxCollider.size = Vector3 (colliderThickness, bounds.height + colliderThickness * 2.0 + fallOutBuffer, colliderThickness);
	boxCollider.center = Vector3 (bounds.xMin - colliderThickness * 0.5, bounds.y + bounds.height * 0.5 - fallOutBuffer * 0.5, 0.0);
	
	var rightBoundary : GameObject = new GameObject ("Right Boundary");
	rightBoundary.layer = createdBoundaries.layer;
	rightBoundary.transform.parent = createdBoundaries.transform;
	boxCollider = rightBoundary.AddComponent (BoxCollider) as BoxCollider;
	boxCollider.size = Vector3 (colliderThickness, bounds.height + colliderThickness * 2.0 + fallOutBuffer, colliderThickness);
	boxCollider.center = Vector3 (bounds.xMax + colliderThickness * 0.5, bounds.y + bounds.height * 0.5 - fallOutBuffer * 0.5, 0.0);
	
	var topBoundary : GameObject = new GameObject ("Top Boundary");
	topBoundary.layer = createdBoundaries.layer;
	topBoundary.transform.parent = createdBoundaries.transform;
	boxCollider = topBoundary.AddComponent (BoxCollider) as BoxCollider;
	boxCollider.size = Vector3 (bounds.width + colliderThickness * 2.0, colliderThickness, colliderThickness);
	boxCollider.center = Vector3 (bounds.x + bounds.width * 0.5, bounds.yMax + colliderThickness * 0.5, 0.0);
	
	var bottomBoundary : GameObject = new GameObject ("Bottom Boundary (Including Fallout Buffer)");
	bottomBoundary.layer = createdBoundaries.layer;
	bottomBoundary.transform.parent = createdBoundaries.transform;
	boxCollider = bottomBoundary.AddComponent (BoxCollider) as BoxCollider;
	boxCollider.size = Vector3 (bounds.width + colliderThickness * 2.0, colliderThickness, colliderThickness);
	boxCollider.center = Vector3 (bounds.x + bounds.width * 0.5, bounds.yMin - colliderThickness * 0.5 - fallOutBuffer, 0.0);
}
