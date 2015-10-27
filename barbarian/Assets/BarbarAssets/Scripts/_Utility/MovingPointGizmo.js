#pragma strict

var texName : String;
// We'll draw a gizmo in the scene view, so it can be found....
function OnDrawGizmos() 
{
	Gizmos.DrawIcon(transform.position, texName);
}
