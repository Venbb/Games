using UnityEngine;
using System.Collections;

public class attackAudio : MonoBehaviour {
    private AudioSource[] m_audioSources;
	// Use this for initialization
	void Start () {
        m_audioSources = this.GetComponents<AudioSource>();
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    public void attack() {
        m_audioSources[0].Play();
    }

    public void hit() {
        m_audioSources[0].Stop();
        m_audioSources[1].Play();
    }

    public void goodAttack() {
        m_audioSources[2].Play();
    }

    public void perfectAttack() {
        m_audioSources[3].Play();
    }

    public void attack_L() {
        m_audioSources[4].Play();
    }

    public void attack_R()
    {
        m_audioSources[5].Play();
    }

    public void attack_U()
    {
        m_audioSources[6].Play();
    }

    public void attack_D()
    {
        m_audioSources[7].Play();
    }

    public void dead() {
        m_audioSources[8].Play();
    }

    public void skillLanding() {
        m_audioSources[9].Play();
    }

    public void reviveYeah() {
        m_audioSources[10].Play();
    }

    public void block() {
        m_audioSources[11].Play();
    }

    public void thunderAttack() {
        m_audioSources[12].Play();
    }
}
