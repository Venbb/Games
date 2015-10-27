#pragma strict

import System.Collections.Generic;

class SpawnActorTimedAction extends MonoActionBase
{
	var m_spawnActorList : SpawnActorInfo[];
	var m_timeDelay : float;
	var m_respawnWhenAllDead : boolean = true;
	
	private var m_timer : float = 0.0;
	private var m_gameObjects : List.<GameObject> = null;
	private var m_flag : boolean = false;
	
	function Start()
	{
		Reset();
	}
	
	function Update()
	{
		if (m_timer > 0)
		{
			m_timer -= Time.deltaTime;
			
			// Spawn
			if (m_timer <= 0)
			{
				var tempPool : GamePool = null;
				var tempObj : GameObject = null;
				var tempActor : ActorBase = null;
				m_gameObjects = new List.<GameObject>(m_spawnActorList.length);
				
				for (var i : int = 0; i < m_spawnActorList.length; ++i)
				{
					tempPool = GamePoolManager.GetInstance().GetPool(m_spawnActorList[i].actorType);
					tempObj = tempPool.InitializeObject(m_spawnActorList[i].spawnPosition.position, Vector3(0,-90,0));
					tempActor = tempObj.GetComponent(ActorBase) as ActorBase;
					
					m_gameObjects.Add(tempObj);
					
					if (tempActor != null)
					{
						tempActor.SetLifeControllCallback(tempPool.KillObject);
					}
				}
			}
		}
		else
		{
			m_flag = true;
			
			// All dead
			for (i = 0; i < m_gameObjects.Count; ++i)
			{
				if ( !(m_gameObjects[i] == null || m_gameObjects[i].active == false) )
				{
					m_flag = false; 
					break;
				}
			}
			
			// Respawn
			if (m_flag)
			{
				Reset();
			}
		}
	}
	
	function Reset()
	{
		m_timer = m_timeDelay;
	}
}