#pragma strict

var m_func : Function = null;
var m_attachedBone : GameObject = null;

function OnCollisionEnter(collision : Collision)
{
	if (m_func != null)
	{
		m_func(collision);
	}
}

function OnCollisionStay(collision : Collision)
{
	//Debug.Log(collision.gameObject);
	//Debug.Log(m_func);
	if (m_func != null)
	{
		m_func(collision);
	}
}

function Start()
{
	if (m_attachedBone != null)
	{
		transform.parent = m_attachedBone.transform;
		transform.localPosition = Vector3(0, 0, 0);
		transform.localRotation = Quaternion.identity;
	}
}