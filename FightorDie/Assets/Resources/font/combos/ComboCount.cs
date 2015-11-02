using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class ComboCount : MonoBehaviour {
    Text m_Text;
    private int m_count ;
    GameObject killObj;
    ScoreManager scoreCountScript;
    private float showTime = 0;
    private Color m_color;
    private float fadeOutTime = 0.2f;
    private float colorAUnit;
	// Use this for initialization
	void Start () {
        m_Text = this.GetComponent<Text>();
        killObj = GameObject.Find("Kill");
        scoreCountScript = killObj.GetComponent<ScoreManager>();
        m_color = m_Text.color;
        m_color.a = 0;
        m_Text.color = m_color;
        colorAUnit = 1f / fadeOutTime;
	}
	
	// Update is called once per frame
	void Update () {
        if (showTime > 0) {
            if (showTime < fadeOutTime)
            {
                m_color.a -= colorAUnit * Time.deltaTime;
                m_Text.color = m_color;
            }
            showTime -= Time.deltaTime;
            if (showTime <= 0)
            {
                m_color.a = 0;
                m_Text.color = m_color;
            }
        }
	}

    public void showCombo() {
        showTime = 0.5f;
        m_count = scoreCountScript.comboScores;
        m_Text.text = "X" + m_count;
        m_color.a = 1;
        m_Text.color = m_color;
    }
}
