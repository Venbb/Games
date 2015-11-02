using UnityEngine;
using System.Collections;

public class warningManager : MonoBehaviour {
    private float outDistance = 45f;
    private Transform m_trasform;
    private Vector3 origPosition;
    private float moveTime = 0.25f;
    private float moveTimer = 0;
    private float stayTime = 3f;
    private bool isMoveOut = false;

    public GameObject m_text;
    private Color textColor;
    private bool isShowText = false;
	// Use this for initialization
	void Start () {
        m_trasform = this.transform;
        origPosition = m_trasform.position;
        m_trasform.position = origPosition -  new Vector3(outDistance, outDistance * Mathf.Tan(6.0f / 180 * Mathf.PI),0);
        textColor = m_text.GetComponent<SpriteRenderer>().color;
        textColor.a = 0;
        m_text.GetComponent<SpriteRenderer>().color = textColor;
	}
	
	// Update is called once per frame
	void Update () {
        if (isMoveOut) {
            if (moveTimer > 0)
            {
                moveTimer -= Time.deltaTime;
                m_trasform.position += new Vector3(outDistance, outDistance * Mathf.Tan(6.0f / 180 * Mathf.PI), 0) * Time.deltaTime / moveTime;
                if (moveTimer < 0)
                {
                    Destroy(this.gameObject);
                }
            }
        }
        else if (moveTimer < moveTime) {
            moveTimer += Time.deltaTime;
            m_trasform.position += new Vector3(outDistance, outDistance * Mathf.Tan(6.0f / 180 * Mathf.PI), 0) * Time.deltaTime / moveTime;
            if (moveTimer >= moveTime) {
                m_trasform.position = origPosition;
                isShowText = true;
            }
        }

        if (isShowText) {
            textColor.a += 0.05f;
            if (textColor.a >= 1) {
                isShowText = false;
            }
            m_text.GetComponent<SpriteRenderer>().color = textColor;
        }
        stayTime -= Time.deltaTime;
        if (stayTime < 0) {
            Destroy(this.gameObject);
        }
	}

    public void moveOut() {
        isMoveOut = true;
    }
}
