using UnityEngine;
using System.Collections;

public class Liz2Manager : MonoBehaviour {
    ParticleSystem m_particleSystem;
	// Use this for initialization
	void Start () {
        m_particleSystem = this.GetComponent<ParticleSystem>();
        m_particleSystem.Stop();
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    public void isLaunchLiz(bool isLaunch) {
        if (isLaunch)
        {
            m_particleSystem.Play();
        }
        else m_particleSystem.Stop();
    }
}
