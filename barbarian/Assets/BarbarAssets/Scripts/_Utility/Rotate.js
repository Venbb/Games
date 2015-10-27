
var rotateSpeed : Vector3;

function Update () 
{
	this.transform.Rotate(rotateSpeed * Time.deltaTime);
}