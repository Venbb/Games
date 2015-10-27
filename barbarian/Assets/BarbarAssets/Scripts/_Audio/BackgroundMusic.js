#pragma strict

private var m_audio : AudioSource;

static private var m_instance : BackgroundMusic = null;

function GetAudioClip() : AudioClip
{
	return m_audio.clip;
}

function Awake()
{
	m_audio = GetComponent(AudioSource) as AudioSource;
	
	if (m_instance == null)
	{
		m_instance = this;
		DontDestroyOnLoad(this.gameObject);
	}		
	else 
	{
		if (m_audio.clip == m_instance.GetAudioClip())
		{
			Destroy(this.gameObject);
			return;
		}
		else
		{
			Destroy(m_instance.gameObject);
		
			m_instance = this;
			DontDestroyOnLoad(this.gameObject);
		}
	}
	
	if (m_audio != null && GameOptionsManager.Singleton().IsBgmEnabled())
	{
		m_audio.Play();
	}
}

function Update () 
{
	if (m_audio != null)
	{
		if (!m_audio.isPlaying && GameOptionsManager.Singleton().IsBgmEnabled() )
		{
			m_audio.Play();
		}
		else if (m_audio.isPlaying && !GameOptionsManager.Singleton().IsBgmEnabled())
		{
			m_audio.Pause();
		}
	}
}