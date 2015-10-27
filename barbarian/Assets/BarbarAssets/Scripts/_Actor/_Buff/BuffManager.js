#pragma strict

import System.Collections.Generic;

class BuffManager extends MonoBehaviour
{
	private var m_buffList : List.<BuffBase> = null;
	private var m_buffConstruction : Dictionary.<EBuffType, System.Type> = null;
	
	static private var m_instance : BuffManager = null;
	
	function Awake()
	{
		if (m_instance == null)
		{
			m_instance = this;
		}
		else 
		{
			Debug.LogError("SceneManager is a singleton, should not be created more than once.");
		}
		
		m_buffList = new List.<BuffBase>();
		m_buffConstruction = new Dictionary.<EBuffType, System.Type>();
		
		m_buffConstruction.Add(EBuffType.Invalid, BuffBase);
		m_buffConstruction.Add(EBuffType.BattleFury, BattleFuryBuff);
		m_buffConstruction.Add(EBuffType.Stun, StunDebuff);
		
		// Test
		//GenerateBuff(null, new BuffInfo());
	}
	
	function OnDestroy()
	{
		m_instance = null;
	}

	static function Singleton() : BuffManager
	{
		if (m_instance == null)
		{
			Debug.LogError("BuffManager should not be null");
		}
	
		return m_instance;
	}
	
	function GenerateBuff(owner : Actor, info : BuffInfo) : BuffBase
	{		
		var buff : BuffBase = m_buffConstruction[info.buffType](owner, info) as BuffBase;

		m_buffList.Add(buff);
		buff.Enter();
		
		return buff;
	}
	
	function Update() 
	{
		for ( var i = 0; i < m_buffList.Count; ++i)
		{
			m_buffList[i].Update();
		}
	}
	
	function DeleteBuff(buff : BuffBase)
	{
		if (m_buffList.Contains(buff))
		{
			buff.Exit();
			m_buffList.Remove(buff);
		}
	}
}

