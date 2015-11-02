using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using UnityEngine.EventSystems;
using UnityEngine.Events;

public class ButtonListener : MonoBehaviour {
    public GameObject playerObj;
    PlayerActions playerScript;
    Button button;
	// Use this for initialization
	void Start () {
        playerObj = GameObject.Find("Hero");
        playerScript = playerObj.GetComponent<PlayerActions>();

        button = GameObject.Find("DefenceButton").GetComponent<Button>();
        EventTriggerListener.Get(button.gameObject).onDown = OnButtonDown;
        EventTriggerListener.Get(button.gameObject).onUp = OnButtonUp;
        //EventTriggerListener.Get(button.gameObject).onClick = OnButtonClick;
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    //private void OnButtonClick(GameObject go)
    //{
    //    //在这里监听按钮的点击事件
    //    if (go == button.gameObject)
    //    {
    //        playerScript.touchEvent(7);
    //    }
    //}

    private void OnButtonDown(GameObject go)
    {
        if (go == button.gameObject)
        {
            playerScript.touchEvent(7);
        }
    }

    private void OnButtonUp(GameObject go)
    {
        if (go == button.gameObject)
        {
            playerScript.touchEvent(0);
        }
    }
}