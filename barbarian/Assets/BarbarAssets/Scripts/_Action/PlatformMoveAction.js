#pragma strict

class PlatformMoveAction extends MonoActionBase
{
	
var targetA : GameObject;
var targetB : GameObject;

var speed : float = 0.1;

function Update () 
{
	var weight = Mathf.Cos(Time.time * speed * 2 * Mathf.PI) * 0.5 + 0.5;
	transform.position = targetA.transform.position * weight
						+ targetB.transform.position * (1-weight);
	//transform.Rotate(Vector3(0, 5*Time.deltaTime, 0));
}

}