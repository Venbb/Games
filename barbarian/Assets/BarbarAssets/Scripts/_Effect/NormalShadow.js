#pragma strict

var m_obj : GameObject = null;

var m_nearDistance : float = 0.2;
var m_scaleNear : Vector3 = Vector3(0.13, 0.001, 0.13);
var m_middleDistance : float = 0.5;
var m_scaleMiddle2 : Vector3 = Vector3(0.1, 0.001, 0.1);
var m_scaleFar : Vector3 = Vector3(0.08, 0.001, 0.08);

private var m_renderer : MeshRenderer = null;
static private var m_groundLayer : float =( 1 << 13 | 1 << 8); // Ground & Box
static private var m_rayDirection : Vector3 = Vector3(0, -1, 0);
static private var ms_maxDistance : float = 100.0;

function Awake()
{
	m_renderer = GetComponent(MeshRenderer) as MeshRenderer;
}

function Start()
{
	transform.parent = null;
	transform.rotation = Quaternion.identity;
}

function LateUpdate()
{
	m_renderer.enabled = m_obj.active;
	
	UpdatePosition();
	
}

function UpdatePosition()
{
	// Only need to update the position of Y Axis
	this.gameObject.transform.position = m_obj.transform.position;
	// Generate a ray
	
	var hitInfo : RaycastHit;

	if (Physics.Raycast(this.gameObject.transform.position, m_rayDirection, hitInfo, ms_maxDistance, m_groundLayer) == true
	 && !hitInfo.collider.isTrigger)
	{
		this.gameObject.transform.position.y = hitInfo.point.y + 0.09; // Small offset on ground
		
		this.gameObject.transform.localScale.x = Mathf.Lerp(m_scaleNear.x, 0, hitInfo.distance/m_middleDistance );
		this.gameObject.transform.localScale.y = Mathf.Lerp(m_scaleNear.y, 0, hitInfo.distance/m_middleDistance );
		this.gameObject.transform.localScale.z = Mathf.Lerp(m_scaleNear.z, 0, hitInfo.distance/m_middleDistance );
	}
	else
	{
		//Debug.Log("No ground.");
		m_renderer.enabled = false;
	}
}

function OnDrawGizmos () 
{
	//if (m_actor != null)
	//{
		//Gizmos.DrawLine (m_actor.transform.position, m_actor.transform.position + Vector3(0, -10, 0));
	//}
}