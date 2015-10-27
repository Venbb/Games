#pragma strict

var m_actorObj : GameObject = null;

static private var ms_deathTriggerMovingTime : float = 0.35;
private var m_deathTriggerMovingTimer : float = 0;

private var m_actor : Actor = null;

function Awake()
{
	if (m_actorObj != null)
	{
		m_actor = m_actorObj.GetComponent(Actor) as Actor;
	}
}

//------------------------------------------------------------------
function OnTriggerStay(collision : Collider)
{
	if (m_actor == null)
	{
		return;
	}
	
    var trigger : GameObject = collision.gameObject;
	
	switch(trigger.tag)
	{
	case  "DeathTrigger" :
		if (m_actor.GetPhysics().IsMoving())
		{
			m_deathTriggerMovingTimer += Time.deltaTime;
        	//ForceDeath();
		}

		if (m_deathTriggerMovingTimer >= ms_deathTriggerMovingTime)
		{
			m_deathTriggerMovingTimer = 0.0;
			m_actor.TrapDamage();
		}
		break;
	default : 
		break;
	}
	
}
