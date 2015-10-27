#pragma strict

var m_actor : GameObject = null;

var m_scaleNear : Vector3 = Vector3(0.13, 0.001, 0.13);
var m_maxDistance : float = 10;

var m_offsetX : float = 0;
var m_useParent : boolean = false;

private var m_actorMono : Actor = null;
private var m_renderer : MeshRenderer = null;
static private var m_groundLayer : float =( 1 << 13 | 1 << 8); // Ground & Box
static private var m_rayDirection : Vector3 = Vector3(0, -1, 0);
static private var ms_maxDistance : float = 100.0;

function Awake()
{
	if (m_actor == null)
	{
		Debug.LogError("Please set the actor object for shadow");
	}
	else
	{
		m_actorMono = m_actor.GetComponent(Actor) as Actor;
	}
	
	m_renderer = GetComponent(MeshRenderer) as MeshRenderer;
}

function Start()
{
	if (!m_useParent)
	{
		transform.parent = null;
	}
	transform.rotation = Quaternion.identity;
}

function LateUpdate()
{
	if (m_actor == null)
	{
		Destroy(this.gameObject);
		return ;
	}
	
	if (m_actorMono == null)
	{
		return ;
	}
	
	m_renderer.enabled = m_actor.active;
	
	UpdatePosition();
	
	transform.rotation = Quaternion.identity;
}

function UpdatePosition()
{
	// Only need to update the position of Y Axis
	
	if (!m_useParent)
	{
		this.gameObject.transform.position = m_actorMono.GetPhysics().GetPosition();
	}
	else
	{
		this.gameObject.transform.position.y = m_actorMono.GetPhysics().GetPosition().y;
	}
	
	// Generate a ray
	this.gameObject.transform.position.x += m_actorMono.GetPhysics().GetDirection().x > 0 ? m_offsetX : -m_offsetX;
	
	var hitInfo : RaycastHit;

	if (Physics.Raycast(this.gameObject.transform.position, m_rayDirection, hitInfo, ms_maxDistance, m_groundLayer) == true
	&& !hitInfo.collider.isTrigger)
	{
		this.gameObject.transform.position.y = hitInfo.point.y + 0.09; // Small offset on ground
		
		this.gameObject.transform.localScale.x = Mathf.Lerp(m_scaleNear.x, 0, hitInfo.distance/m_maxDistance );
		this.gameObject.transform.localScale.y = Mathf.Lerp(m_scaleNear.y, 0, hitInfo.distance/m_maxDistance );
		this.gameObject.transform.localScale.z = Mathf.Lerp(m_scaleNear.z, 0, hitInfo.distance/m_maxDistance );
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