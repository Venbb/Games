using UnityEngine;
using System.Collections;

public class EnemyAudio : MonoBehaviour {
    private AudioSource[] m_audioSources;
    // Use this for initialization
    void Start()
    {
        m_audioSources = this.GetComponents<AudioSource>();
    }
	
	// Update is called once per frame
	void Update () {
	
	}

    public void cheer()
    {
        m_audioSources[0].Play();
    }
}
