using UnityEngine;
using System.Collections;

public class NewPlayerGuide : MonoBehaviour {
    private int guidesMember = 3;

    private string guideKey1 = "isGuideAttack";
    public int isGuideAttack;  //0:false 1:true

    private string guideKey2 = "isGuideSkill";
    public int isGuideSkill;

    private string guideKey3 = "isGuideArcherBlock";
    public int isGuideArcherBlock;

    private string guideKey4 = "isGuideCrowBlock";
    public int isGuideCrowBlock;

    //private bool isGuiding;
    //private float guideTime = 5f;
    //private float guideTimer1 = 0;
    //private float guideTimer2 = 0;
    //private float guideTimer3 = 0;
    //private float guideTimer4 = 0;

    private Rect Position1 = new Rect(0,0,Screen.width/2,Screen.height/2);
    private Rect Position2 = new Rect(Screen.width / 2, 0, Screen.width / 2, Screen.height / 2);
    private Rect Position3 = new Rect(0, Screen.height / 2, Screen.width / 2, Screen.height / 2);
    private Rect Position4 = new Rect(Screen.width / 2, Screen.height / 2, Screen.width / 2, Screen.height / 2);
	// Use this for initialization
	void Start () {
        isGuideAttack = PlayerPrefs.GetInt(guideKey1, 0);
        isGuideSkill = PlayerPrefs.GetInt(guideKey2, 0);
        isGuideArcherBlock = PlayerPrefs.GetInt(guideKey3, 0);
        isGuideCrowBlock = PlayerPrefs.GetInt(guideKey4, 0);
        //isGuideAttack = 0;
        //isGuideSkill = 0;
        //isGuideArcherBlock =  0;
        //isGuideCrowBlock = 0;
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    void OnGUI() {
        //if (isGuiding) {
        //    GUI.skin.label.alignment = TextAnchor.MiddleCenter;
        //    GUI.skin.label.fontSize = Mathf.FloorToInt(40.0f / 1080f * Screen.width);
        //    if (guideTimer1 > 0) {
        //        guideTimer1 -= Time.deltaTime;
        //        GUI.Label(Position1, "When the monster is close，Slide screen toward the monster to kill it！");
        //    }
        //    if (guideTimer3 > 0)
        //    {
        //        guideTimer3 -= Time.deltaTime;
        //        GUI.Label(Position3, "Press the button below to block enemies ranged attack！");
        //    }
        //    if (guideTimer2 > 0)
        //    {
        //        guideTimer2 -= Time.deltaTime;
        //        GUI.skin.label.fontSize = Mathf.FloorToInt(60.0f / 1080f * Screen.width);
        //        GUI.Label(Position2, "Tap screen to release skills！");
        //    }
        //    if(guideTimer1 <= 0 && guideTimer2 <= 0 && guideTimer3 <= 0){
        //        isGuiding = false;
        //    }
        //}
    }

    public void updateGuide(int number) {
        //isGuiding = true;
        switch (number) { 
            case 1:
                isGuideAttack = 1;
                //guideTimer1 = guideTime;
                PlayerPrefs.SetInt(guideKey1, 1);
                break;
            case 2:
                isGuideSkill = 1;
                //guideTimer2 = guideTime;
                PlayerPrefs.SetInt(guideKey2, 1);
                break;
            case 3:
                isGuideArcherBlock = 1;
                //guideTimer3 = guideTime;
                PlayerPrefs.SetInt(guideKey3, 1);
                break;
            case 4:
                isGuideCrowBlock = 1;
                //guideTimer4 = guideTime;
                PlayerPrefs.SetInt(guideKey4, 1);
                break;
            default: break;
        }
    }

    public void skipGuide() {
        //isGuiding = false;
        for (int i = 1; i <= guidesMember; i++) {
            updateGuide(i);
        }
    }

}
