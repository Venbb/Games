using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class GuideText : MonoBehaviour {
    Text m_guideText;
	// Use this for initialization
	void Start () {
        m_guideText = this.GetComponent<Text>();
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    public void setText(string m_Text) {
        m_guideText.text = m_Text;
        GameObject.Find("GuideText_C").GetComponent<GuideText_C>().setGuide_C(m_Text);
    }
}
