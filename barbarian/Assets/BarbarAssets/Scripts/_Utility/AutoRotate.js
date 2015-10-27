#pragma strict

var m_rotateSpeed : Vector3;

function Update ()
{
	this.transform.Rotate(m_rotateSpeed * Time.deltaTime);
}