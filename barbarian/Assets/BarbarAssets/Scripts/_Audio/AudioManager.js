// 2011.08 yun.li
// Audio Manager

#pragma strict

import System.Collections.Generic;

var m_maxPlayingAudioCount : int = 5;

static private var m_instance : AudioManager = null;

private var m_playingAudioCount : int = 0;
private var m_PlayingAudioList : List.<AudioSource> = null;
//private var m_audioSourceList : AudioSource[] = null;

static function Singleton() : AudioManager
{
	return m_instance;
}

function Awake()
{
	m_playingAudioCount = 0;	
	m_PlayingAudioList = new List.<AudioSource>();
	//m_audioSourceList = GetComponents.<AudioSource>() as AudioSource[];
	
	if (m_instance == null)
	{
		m_instance = this;
		DontDestroyOnLoad(this.gameObject);
	}		
	else
	{
		Destroy(this.gameObject);
	}
}

function PlayButtonAudio()
{
	Play(GetComponent(AudioSource) as AudioSource);
}

function Play(audioSource : AudioSource)
{
	if (!GameOptionsManager.Singleton().IsSoundEnabled())
	{
		return ;
	}
	// Check Duplicate
	if ( !audioSource.isPlaying )
	{ 
		if (m_playingAudioCount >= m_maxPlayingAudioCount)
		{
			m_PlayingAudioList[0].Stop();
			m_PlayingAudioList.RemoveAt(0);
		}
		else
		{
			m_playingAudioCount++;
		}
		
		m_PlayingAudioList.Add(audioSource);
	}
	else
	{
		audioSource.time = 0;
	}
	audioSource.Play();
}

function Update()
{
	for (var i : int = 0; i < m_PlayingAudioList.Count; ++i)
	{
		if (m_PlayingAudioList[i] == null || !m_PlayingAudioList[i].isPlaying)
		{
			m_PlayingAudioList.RemoveAt(i);
			i--;
			m_playingAudioCount--;
		}
	}
}
