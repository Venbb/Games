using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class GuideText_C : MonoBehaviour {
    public Sprite[] m_GuideTexts;
    Image m_image;
    int imageIndex;
	// Use this for initialization
	void Start () {
        m_image = this.GetComponent<Image>();
        imageIndex = m_GuideTexts.Length-1;
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    public void setGuide_C(string index) {
        switch(index){
            case "SWIPE  RIGHT":
                imageIndex = 0;
                break;
            case "SWIPE  LEFT":
                imageIndex = 1;
                break;
            case "SWIPE  UP":
                imageIndex = 2;
                break;
            case "SWIPE  DOWN":
                imageIndex = 3;
                break;
            case "TAP  SCREEN":
                imageIndex = 4;
                break;
            case "HOLD  TO  DEFENCE":
                imageIndex = 5;
                break;
            default:
                imageIndex = m_GuideTexts.Length-1;
                break;
        }
        m_image.sprite = m_GuideTexts[imageIndex];
        m_image.SetNativeSize();
    }
}
