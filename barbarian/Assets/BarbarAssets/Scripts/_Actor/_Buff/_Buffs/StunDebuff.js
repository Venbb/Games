#pragma strict

class StunDebuff extends BuffBase
{
	private var m_aiActor : AiActor = null;
	
	function StunDebuff(owner : Actor, info : BuffInfo)
	{
		super(owner, info);
		
		m_aiActor = owner as AiActor;
	}
	
	function Enter()
	{
		//Debug.Log("Sutn Enter");
		
		if (m_aiActor && m_aiActor.IsStunable())
		{
			// Change state, and animation
			//Debug.Log("m_buffInfo.duration "  + m_buffInfo.duration);
			m_aiActor.SetStunTime(m_buffInfo.GetDuration());
			m_aiActor.Stun();
		}
	}
	
	function Update()
	{
		super.Update();
		
		if (!m_aiActor || IsTimeOver() || !m_aiActor.IsInState(EFsmState.Stun))
		{
			BuffOver();
		}
	}
	
	function Exit()
	{
		//Debug.Log("Sutn Exit");
		if (m_aiActor)
		{
			m_aiActor.SetStunTime(0);
		}
	}

}
