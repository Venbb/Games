#pragma strict

class SpawnActorInfo
{
	var spawnPosition : Transform = null;
	var actorType : EGamePool;
}

var m_effectiveTag : String = "";
var m_spawnActorList : SpawnActorInfo[];

private var m_triggeredd : boolean = false;


function OnTriggerEnter(other : Collider)
{	
	if (!m_triggeredd && other.tag == m_effectiveTag)
	{
		m_triggeredd = true;
		var tempPool : GamePool = null;
		var tempObj : GameObject = null;
		var tempActor : ActorBase = null;
		
		for (var i : int = 0; i < m_spawnActorList.length; ++i)
		{
			tempPool = GamePoolManager.GetInstance().GetPool(m_spawnActorList[i].actorType);
			tempObj = tempPool.InitializeObject(m_spawnActorList[i].spawnPosition.position);
			tempActor = tempObj.GetComponent(ActorBase) as ActorBase;
			
			if (tempActor != null)
			{
				tempActor.SetLifeControllCallback(tempPool.KillObject);
			}
		}
	}
}