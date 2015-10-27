#pragma strict

class Audio extends ActorBase
{
	private var m_audioSource : AudioSource = null;
	
	function Awake()
	{
		m_audioSource = GetComponent(AudioSource) as AudioSource;
	}
	
	function SetClip(clip : AudioClip)
	{
		m_audioSource.clip = clip;
	}
	
	function Play()
	{
		AudioManager.Singleton().Play(m_audioSource);
	}
	
	function Update()
	{
		if (!m_audioSource.isPlaying)
		{
			if (m_lifeControllCallback != null)
			{
				m_lifeControllCallback(this.gameObject);
			}
			else
			{
				Destroy(this.gameObject);
			}
		}
	}
}
