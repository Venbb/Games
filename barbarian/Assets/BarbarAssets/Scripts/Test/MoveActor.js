
var Gravity : float = 9.8f;

//private var controller : CharacterController;
private var moveDirectionY : float;

function Start()
{
	moveDirectionY = 10.0f;
}

function Awake()
{
	//controller = GetComponent(CharacterController);
}


function Update () {
	
	if (moveDirectionY > 0.0f)
	{		
		transform.position.y = transform.position.y - Gravity*Time.deltaTime;
	}
	else
	{
		Debug.Log("moveDirectionY : " + moveDirectionY.ToString());
		transform.position.y = transform.position.y - moveDirectionY;
	}
}

function OnControllerColliderHit (hit : ControllerColliderHit)
{
	if (hit.moveDirection.y > 0.01) 
		return;
	
	// Make sure we are really standing on a straight platform
	// Not on the underside of one and not falling down from it either!
	if (hit.moveDirection.y < -0.9 && hit.normal.y > 0.9) {
		moveDirectionY = hit.moveDirection.y; //activePlatform = hit.collider.transform;	
	}	
	
	Debug.Log("moveDirectionY : " + moveDirectionY.ToString());
}