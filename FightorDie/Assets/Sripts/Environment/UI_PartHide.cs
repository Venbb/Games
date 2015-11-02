using UnityEngine;
using System.Collections;

public class UI_PartHide : MonoBehaviour {
    private Transform m_transform;
    private Vector2 origScale;
    private Vector2 m_scale;
    private float changTime = 0.5f;
    private bool hiding = false;
    private bool showing = false;
    private float changeRatioUnit;

    public GameObject childX;
    public GameObject childY;
	// Use this for initialization
	void Start () {
        m_transform = this.transform;
        origScale = m_transform.localScale;
        m_scale = origScale * 3;
        m_transform.localScale = m_scale;
        changeRatioUnit = 1f / changTime;
	}
	
	// Update is called once per frame
	void Update () {
        if (hiding) {
            float changeScale = changeRatioUnit * Time.deltaTime;
            m_scale.x += changeScale;
            m_scale.y += changeScale;
            if (m_scale.x >= origScale.x * 3) {
                hiding = false;
                m_scale = origScale * 3;
            }
            m_transform.localScale = m_scale;
        }
        if (showing) {
            float changeScale = changeRatioUnit * Time.deltaTime;
            m_scale.x -= changeScale;
            m_scale.y -= changeScale;
            if (m_scale.x <= origScale.x) {
                showing = false;
                m_scale = origScale;
            }
            m_transform.localScale = m_scale;

        }
	}

    public void show() {
        showing = true;
        hiding = false;
    }

    public void hide()
    {
        hiding = true;
        showing = false;
    }

    public void TryHideKeySign(bool TorF)
    {
        if (GameObject.Find("MainScreen").GetComponent<GameMaster>().keyBoardControl())
        {
            try
            {
                if (TorF)
                {
                    childX.active = false;
                    childY.active = false;
                }
                else
                {
                    childX.active = true;
                    childY.active = true;
                }
            }
            catch
            {

            }
        }
    }
}
