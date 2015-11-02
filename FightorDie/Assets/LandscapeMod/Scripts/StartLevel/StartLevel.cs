using UnityEngine;
using System.Collections;

public class StartLevel : MonoBehaviour {

	// Use this for initialization
	void Start () {
        PlayerPrefs.SetInt("isGuideAttack", 0);
        PlayerPrefs.SetInt("isGuideSkill", 0);
        PlayerPrefs.SetInt("isGuideArcherBlock", 0);
        PlayerPrefs.SetInt("isGuideCrowBlock", 0);
        PlayerPrefs.SetInt("PlayerGold", 500);
        if (Screen.width * 1.0f / Screen.height > 1920.0f / 1080) {
            this.GetComponent<RectTransform>().localScale = new Vector2(1.0f*Screen.width/Screen.height/(1920.0f/1080),1);
        }
        else if (Screen.width * 1.0f / Screen.height < 1920.0f / 1080) {
            this.GetComponent<RectTransform>().localScale = new Vector2(1, 1.0f / (1.0f*Screen.width / Screen.height / (1920.0f / 1080)));
        }
	}
	
	// Update is called once per frame
	void Update () {
        Application.LoadLevel("FightOrDie_Landscape");
	}
}
