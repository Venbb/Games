#pragma strict

var root : GameObject = null;
var m_needSaveSummons : boolean = false;

protected var m_lifeControllCallback : Function = null;
protected var m_fatherRate : float = 0.0f;
protected var m_father : ActorBase = null;
protected var m_summons : ActorBase[] = null;
protected var m_summonsCount : int = 0;

function SetLifeControllCallback( func : Function)
{
	m_lifeControllCallback = func;	
	//Debug.Log(m_lifeControllCallback);
}

function DestorySelf()
{
	Debug.Log("DestorySelf");
	var tempObj : GameObject = (root != null) ? root : this.gameObject;
	
	if (m_father != null)
	{
		m_father.Unregister(this);
	}
	
	if (m_lifeControllCallback != null) 
	{
		if (m_lifeControllCallback(tempObj))
		{
			Debug.Log("Projectile retrieved succeed.");
		}
	}
	else
	{
		Destroy(tempObj);
	}
}

function SetFatherRate(rate : float)
{
	m_fatherRate = rate;
}

function SetFather(actorBase : ActorBase)
{
	if (actorBase != null)
	{
		m_father = actorBase;
		m_father.Register(this);
	}
}

function Register(actorBase : ActorBase) : boolean
{
	if (m_summons == null || !m_needSaveSummons)
	{
		return false;
	}
	
	m_summons[m_summonsCount] = actorBase;
	m_summonsCount++;
	
	return true;
}

function Unregister(actorBase : ActorBase) : boolean
{
	if (m_summons == null || !m_needSaveSummons)
	{
		return false;
	}
	
	for ( var i : int = 0; i < m_summonsCount; ++i)
	{
		if (m_summons[i] == actorBase)
		{
			m_summons[i] = m_summons[m_summonsCount - 1];
			m_summons[m_summonsCount - 1] = null;
			m_summonsCount--;
			return true;
		}
	}
	
	return false;
}
