using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class ComboHead : MonoBehaviour {
    public GameObject m_Text_C;
    Text m_text;
    private Color m_color;
    private float showTime = 0;
    private float fadeOutTime = 0.2f;
    private float colorAUnit;
	// Use this for initialization
	void Start () {
        m_text = this.GetComponent<Text>();
        m_color = m_text.color;
        m_color.a = 0;
        m_text.color = m_color;
        m_Text_C.GetComponent<Image>().color = m_color;
        colorAUnit = 1f / fadeOutTime;
	}
	
	// Update is called once per frame
	void Update () {
        if (showTime > 0)
        {   
            if(showTime<fadeOutTime){
                m_color.a -= colorAUnit*Time.deltaTime;
                m_text.color = m_color;
                m_Text_C.GetComponent<Image>().color = m_color;
            }
            showTime -= Time.deltaTime;
            if (showTime <= 0)
            {
                m_color.a = 0;
                m_text.color = m_color;
                m_Text_C.GetComponent<Image>().color = m_color;
            }
        }
	}

    public void showCombo()
    {
        showTime = 0.5f;
        m_color.a = 1;
        m_text.color = m_color;
        m_Text_C.GetComponent<Image>().color = m_color;
    }
}
