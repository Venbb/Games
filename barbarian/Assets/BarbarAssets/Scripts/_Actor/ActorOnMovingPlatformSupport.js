

function Update () 
{

}

function OnTriggerEnter(other : Collider)
{
	if (other.gameObject.tag == "MovingPlatform")
	{
		(GetComponent(ActorPhysics) as ActorPhysics).m_enableGravity = false;
		//other.transform.parent = this.transform;
		//this.transform.parent = other.transform;
	}
}

function OnTriggerExit(other : Collider)
{
	if (other.gameObject.tag == "MovingPlatform")
	{		
		(GetComponent(ActorPhysics) as ActorPhysics).m_enableGravity = true;

		//other.transform.parent = null;
		//this.transform.parent = null;
	}
}