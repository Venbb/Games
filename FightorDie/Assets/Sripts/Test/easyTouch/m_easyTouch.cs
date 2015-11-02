using UnityEngine;
using System.Collections;

public class m_easyTouch : MonoBehaviour {
    private string testText;
	// Use this for initialization
	void Start () {
        testText = "";
        easyTouchControl();
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    void OnGUI() {
        // 改变字符的大小
        GUI.skin.label.fontSize = 60;
        // 输出文字
        GUI.Label(new Rect(Screen.width / 16*1, Screen.height /16*2, Screen.width/16*14, Screen.height/16*12), testText);
    }

    void easyTouchControl()
    {
        EasyTouch.On_SwipeEnd += EasyTouch_On_SwipeEnd;
        EasyTouch.On_LongTapEnd += EasyTouch_On_LongTapEnd;
        EasyTouch.On_SimpleTap += EasyTouch_On_SimpleTap;
        EasyTouch.On_SimpleTap2Fingers += EasyTouch_On_SimpleTap2Fingers;
    }

    void EasyTouch_On_SimpleTap2Fingers(Gesture gesture)
    {
        testText += "simple tap 2 fingers \n";
    }

    void EasyTouch_On_SimpleTap(Gesture gesture)
    {
        testText += "simple tap \n";
    }

    void EasyTouch_On_LongTapEnd(Gesture gesture)
    {
        testText += "long tap end \n";
    }

    void EasyTouch_On_SwipeEnd(Gesture gesture)
    {
        testText += "swipe end @ " + gesture.swipe+"\n";
    }
}
