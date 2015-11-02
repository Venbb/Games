using UnityEngine;
using System.Collections;

public class trap1Manager : MonoBehaviour {
    private Transform m_transform;
    private float launchTime = 1f;
    private float Timer = 0f;
    private float colorChangeUnit = 0.35f;
    private bool isLaunch = false;
    public Transform trapCollider;
    Color m_color;
    private float liveTime = 5f;
    private float liveTimer = 0f;

	// Use this for initialization
	void Start () {
        m_color = this.GetComponent<SpriteRenderer>().color;
        m_color.a = 0f;
        this.GetComponent<SpriteRenderer>().color = m_color;
        m_transform = this.transform;
	}
	
	// Update is called once per frame
	void Update () {
        Timer += Time.deltaTime;
        if (Timer >= launchTime) {
            Timer = 0f;
            isLaunch = true;
        }
        if (!isLaunch && m_color.a > 0) {
            m_color.a -= colorChangeUnit*0.2f;
            if (m_color.a <= 0) {
                m_color.a = 0;
            }
            this.GetComponent<SpriteRenderer>().color = m_color;
        }else if (isLaunch) {
            m_color.a += colorChangeUnit;
            if (m_color.a >= 1f) {
                m_color.a = 1f;
                Instantiate(trapCollider, m_transform.position, m_transform.rotation);
                isLaunch = false;
            }
            this.GetComponent<SpriteRenderer>().color = m_color;
        }

        liveTimer += Time.deltaTime;
        if (liveTimer > liveTime) {
            Destroy(this.gameObject);
        }
	}
}
