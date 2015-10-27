#pragma strict

class BuffBase
{
	protected var m_buffInfo : BuffInfo = null;
	protected var m_timer : float = 0;
	
	protected var m_owner : Actor = null;
	
	function BuffBase()
	{
	}
	
	function BuffBase(owner : Actor, buffInfo : BuffInfo)
	{
		m_owner = owner;
		m_buffInfo = buffInfo;
		m_timer = 0;
	}
	
	function Enter()
	{
		//Debug.Log("No implement in BuffBase");
	}
	
	function Update () 
	{
		TimerUpdate();
	}
	
	function Exit()
	{
		//Debug.Log("No implement in BuffBase");
	}
	
	function BuffOver()
	{
		BuffManager.Singleton().DeleteBuff(this);
		
		if (m_owner)
		{
			m_owner.RemoveBuff(m_buffInfo.buffType);
		}
	}
	
	function TimerUpdate()
	{
		m_timer += Time.deltaTime;
	}
	
	function IsTimeOver() : boolean
	{
		return m_timer >= m_buffInfo.GetDuration();
	}
}