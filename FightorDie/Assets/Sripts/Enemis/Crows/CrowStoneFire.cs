using UnityEngine;
using System.Collections;

public class CrowStoneFire : MonoBehaviour {
    private Transform m_transform;
    public Transform m_StoneDie;
    public Transform m_StoneKill;
    public GameObject playerObj;
    private Vector2 colliderPositonOffset = new Vector2(0, 1.2f);
    private Vector2 forcePosition;
    private float scaleChangeUnit = 0.4f;
    private bool isFromDown = false;
	// Use this for initialization
	void Start () {
        m_transform = this.transform;
        if (m_transform.position.y < 0) {
            isFromDown = true;
        }
        try {
            playerObj = GameObject.Find("Hero");
            forcePosition = (Vector2)playerObj.transform.position + colliderPositonOffset;
            Vector3 force = forcePosition - (Vector2)m_transform.position;
            this.gameObject.GetComponent<Rigidbody2D>().AddForceAtPosition(force * 220, forcePosition);
            float angZ = Mathf.Atan2(force.x, force.y);
            m_transform.localRotation = Quaternion.Euler(0, 0, -angZ / Mathf.PI * 180 + 180);
        }
        catch{
            Destroy(this.gameObject);
        }
	}
	
	// Update is called once per frame
	void Update () {
        m_transform.localScale *= (1 - scaleChangeUnit * Time.deltaTime);
	}

    void OnTriggerEnter2D(Collider2D other)
    {
        Vector2 m_position = m_transform.position;
        if (other.tag.CompareTo("Block") == 0)
        {
            m_position.y += 0.4f;
            if (isFromDown) {
                m_position.y -= 0.8f;
            }
            Instantiate(m_StoneDie, m_position, m_transform.rotation);
            Destroy(this.gameObject);
        }
        if (other.tag.CompareTo("Player") == 0) {
            m_position.y += 1.6f;
            if (isFromDown)
            {
                m_position.y -= 3.2f;
            }
            Instantiate(m_StoneKill, m_position, m_transform.rotation);
            Destroy(this.gameObject);
        }
    }
}
