#pragma strict

class BattleFuryBuff extends BuffBase
{
	/*
	var attackAdditiveRate : float[];
	var hpAdditiveRate : float[];
	var scaleRate : float[];
	*/
	
	private var m_scaleModifyTime : float = 0.8f;
	private var m_currentScale : float = 0.0f;
	
	function BattleFuryBuff(owner : Actor, info : BuffInfo)
	{
		super(owner, info);
	}
	
	function Enter()
	{
		//Debug.Log("BattleFuryBuff Enter");
		
		// Change current attack value
		//m_xuewu = GameObject.FindGameObjectWithTag("xuewu");
		m_owner.SetAttack( m_owner.GetAttack() * ( 1 + m_buffInfo.GetAttackAdditiveRate() ) );
		m_owner.SetMaxHp( m_owner.GetMaxHp() * ( 1 + m_buffInfo.GetHpAdditiveRate() ) );
		m_owner.SetHp( m_owner.GetHp() * ( 1 + m_buffInfo.GetHpAdditiveRate() ) );
		ControllableActor.Singleton().xuewuActive();
		//setTarge();
	}
	
	function Update()
	{
		super.Update();
		
		if (!m_owner || IsTimeOver())
		{
			BuffOver();
			return;
		}
		
		// Scale modify
		if (m_timer <= m_scaleModifyTime)
		{
			m_owner.SetScaleAddtiveRate(Mathf.Lerp(0, m_owner.GetOriScaleRate() * m_buffInfo.GetScaleRate(), m_timer / m_scaleModifyTime));			
		}
		else if ( (m_buffInfo.GetDuration() - m_timer) <= m_scaleModifyTime )
		{
			// 23 is the battle fury end sound
			//m_owner.PlaySound(1, 23, false);
			m_owner.SetScaleAddtiveRate( Mathf.Lerp(0, m_owner.GetOriScaleRate() * m_buffInfo.GetScaleRate(), (m_buffInfo.GetDuration() - m_timer) / m_scaleModifyTime) );
		}
	}
	
	function Exit()
	{
		//Debug.Log("BattleFuryBuff Exit");
		m_owner.SetScaleAddtiveRate(0);
		m_owner.SetAttack( m_owner.GetAttack() / ( 1 + m_buffInfo.GetAttackAdditiveRate() ) );
		m_owner.SetMaxHp( m_owner.GetMaxHp() / ( 1 + m_buffInfo.GetHpAdditiveRate() ) );
		m_owner.SetHp( m_owner.GetHp() / ( 1 + m_buffInfo.GetHpAdditiveRate() ) );
	    
	    ControllableActor.Singleton().xuewuActive();
	}

}
