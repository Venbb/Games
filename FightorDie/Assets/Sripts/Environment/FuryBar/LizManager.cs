using UnityEngine;
using System.Collections;

public class LizManager : MonoBehaviour {
    private Transform m_transform;
    ParticleSystem m_particleSystem;
    private float m_lifeTime = 0f;
    private float changeRate = 5.0f;
    private float timer = 0f;
    private bool isLaunch = true;
	// Use this for initialization
	void Start () {
        m_transform = this.transform;
        m_particleSystem = this.GetComponent<ParticleSystem>();
        m_particleSystem.Stop();
	}
	
	// Update is called once per frame
	void Update () {
        if (isLaunch) {
            timer += Time.deltaTime;
            if (timer >= 1.0f / changeRate)
            {
                timer = 0f;
                float posX = m_transform.position.x;
                if (posX > -3)
                {
                    m_particleSystem.Play();
                    m_particleSystem.startLifetime = (posX + 3) / 7.0f * 1.2f + 0.2f;
                }
                else m_particleSystem.Stop();

            }
        }
	}

    public void isLaunchLiz(bool isLaunch) {
        this.isLaunch = isLaunch;
        if (!isLaunch) {
            m_particleSystem.Stop();
        }
    }
}
