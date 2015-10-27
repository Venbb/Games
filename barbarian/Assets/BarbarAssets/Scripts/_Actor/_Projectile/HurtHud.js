// coder : li yun

#pragma strict

class HurtHud extends Projectile
{
	private var m_emitter : ParticleEmitter = null;
	
	function Awake()
	{
		super.Awake();
		
		m_emitter = GetComponent(ParticleEmitter) as ParticleEmitter;
	}
	
	function OnEnable()
	{
		if (m_emitter != null)
		{
			m_emitter.ClearParticles();
		}
	}
}
