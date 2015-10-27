// coder : li yun
#pragma strict

class Boss3 extends Enemy
{
	var m_maxSummonsCount : int = 6;
	
	function Awake()
	{
		super.Awake();
		
		m_summons = new ActorBase[m_maxSummonsCount];
		m_summonsCount = 0;
	}
	
	function Reset()
	{
		super.Reset();
		m_summons = new ActorBase[m_maxSummonsCount];
		m_summonsCount = 0;
	}
	
	function RandomGenerateCurrentSkill()
	{
		if (m_useCounterattack && m_currentHurtCount >= m_maxHurtCount && m_summonsCount < m_maxSummonsCount)
		{
			// Use last skill
			m_currentSkill = m_skillList.length - 1;
			return;
		}
	
		super.RandomGenerateCurrentSkill();
		
		if (m_summonsCount >= m_maxSummonsCount && m_skillList[m_currentSkill].useSummon)
		{
			// Use first skill
			m_currentSkill = m_skillList.length > 0 ? 0 : -1;
			return;
		}
	}
	
	function SummonAttack() : Actor[]
	{
		var actors : Actor[] = super.SummonAttack();
		
		for ( var i : int = 0; i < actors.length; ++i)
		{
			if (m_summonsCount < m_maxSummonsCount)
			{
				actors[i].SetFather(this);
			}
			else
			{
				actors[i].DestorySelf();
			}
		}
	}
	
	function ApplyDamage(damageInfo : DamageInfo) : boolean
	{
		if (super.ApplyDamage(damageInfo))
		{
			// Dead
			if (IsDead())
			{
				//Debug.Log(" Kill all summons : " + m_summonsCount);
				// Kill all summon
				for ( var i : int = 0; i < m_summonsCount; ++i)
				{
					//Debug.Log( " destroy " + i + " : "  +m_summons[i]);
					
					if ((m_summons[i] as Actor) != null)
					{
						(m_summons[i] as Actor).ForceDeath();
					}
				}
			}
			return true;
		}
		
		return false;
	}
}