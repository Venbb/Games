using UnityEngine;
using System.Collections;

public class LightTail : MonoBehaviour {
    private int nowFrame = 0;
    private int maxFrame = 0;
    private bool isShinning = false;
    private float colorAUnit;
    private SpriteRenderer m_renderer;
    private Color m_color;
    private bool isShinningEnd = false;
    private float keepLightTime = 0f;
    private float keepTimer;

    private int endShinningFrame = 10;

	// Use this for initialization
	void Start () {
        m_renderer = this.GetComponent<SpriteRenderer>();
        m_color = m_renderer.color;
        m_renderer.color = new Color(m_color.r, m_color.b, m_color.g, 0f);

        keepTimer = keepLightTime;
	}
	
	// Update is called once per frame
	void Update () {

        if (isShinningEnd) {
            if (keepTimer <= 0)
            {
                if (nowFrame > 0)
                {
                    nowFrame--;
                    m_renderer.color = new Color(m_color.r, m_color.b, m_color.g, colorAUnit * nowFrame);
                }
                else if (nowFrame == 0)
                {
                    isShinningEnd = false;
                    keepTimer = keepLightTime;
                }
            }
            else keepTimer -= Time.deltaTime;

        }

        if (isShinning) {
            if (nowFrame < maxFrame) {
                nowFrame++;
                m_renderer.color = new Color(m_color.r, m_color.b, m_color.g, colorAUnit*nowFrame);
            }
            else
            {
                isShinning = false;
                isShinningEnd = true;
                nowFrame = endShinningFrame;
                colorAUnit = 1f / endShinningFrame;
            }
        }
	}

    void OnGUI() { 
        
    }

    public void shinning(int nFrame) {
        nowFrame = 0;
        maxFrame = nFrame;
        colorAUnit = 1f / maxFrame;
        isShinning = true;
    }
}
