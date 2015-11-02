using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class ReviveManager : MonoBehaviour {

    public GameObject ReviveButton;
    public GameObject GiveUpButton;
    public GameObject Shadow;
    public GameObject CountDown;
    public GameObject GoldNeedText;
    private Transform reviveTransform;
    private Transform giveUpTransform;
    private Transform shadowTransform;
    //private Transform countDownTransform;
    private Vector2 reviveOrigPosition;
    private Vector2 giveUpOrigPosition;
    private Vector2 shadowOrigPosition;
    //private Vector2 countDownOrigPosition;
    private Vector2 revivePosition;
    private Vector2 giveUpPosition;
    private Vector2 shadowPosition;
    //private Vector2 countDownPosition;
    private SkeletonAnimation countDownAnimation;
    private float moveTime = 0.2f;
    private bool isMoveIn = false;
    private bool isMoveOut = false;
    private float moveTimer = 0f;
    private float reviveTimeOut = 0f;

    private float reviveOutDistance = 40f;
    private float giveUpOutDistance = 50f;
    private float shadowOutDistance = 60f;

    private Color m_GoldTextColor;
    private Color m_OrigGoldColor;
    private int ShiningTimes = 3;
    private bool isShining = false;
	// Use this for initialization
	void Start () {
        //this.enabled = false;
        //this.gameObject.SetActiveRecursively(false);

        reviveTransform = ReviveButton.transform;
        giveUpTransform = GiveUpButton.transform;
        shadowTransform = Shadow.transform;
        reviveOrigPosition = reviveTransform.position;
        giveUpOrigPosition = giveUpTransform.position;
        shadowOrigPosition = shadowTransform.position;
        revivePosition = reviveOrigPosition;
        giveUpPosition = giveUpOrigPosition;
        shadowPosition = shadowOrigPosition;
        revivePosition.x -= reviveOutDistance;
        giveUpPosition.x -= giveUpOutDistance;
        shadowPosition.y += shadowOutDistance;
        reviveTransform.position = revivePosition;
        giveUpTransform.position = giveUpPosition;
        shadowTransform.position = shadowPosition;
        countDownAnimation = CountDown.GetComponent<SkeletonAnimation>();
        countDownAnimation.timeScale = 0;
        countDownAnimation.state.End += state_End;
        m_OrigGoldColor = GoldNeedText.GetComponent<Text>().color;
        m_GoldTextColor = m_OrigGoldColor;
	}

    void state_End(Spine.AnimationState state, int trackIndex)
    {
        if (state.GetCurrent(trackIndex) + "" == "daojishi") {
            countDownAnimation.state.SetAnimation(2, "bao", false);
        }
        //if (state.GetCurrent(trackIndex) + "" == "bao")
        //{
        //    GameObject.Find("Canvas").GetComponent<CreatUISence>().ReviveTimeOut();
        //}
    }
	
	// Update is called once per frame
	void Update () {
        if (isMoveIn && moveTimer < moveTime) {
            moveTimer += Time.deltaTime;
            revivePosition.x += reviveOutDistance / moveTime * Time.deltaTime;
            giveUpPosition.x += giveUpOutDistance / moveTime * Time.deltaTime;
            if (moveTimer >= moveTime) {
                revivePosition = reviveOrigPosition;
                giveUpPosition = giveUpOrigPosition;
                isMoveIn = false;
                moveTimer = 0;
                countDownAnimation.timeScale = 1;
                countDownAnimation.state.SetAnimation(1,"daojishi",false);
                reviveTimeOut = 11.6f;
                GameObject.Find("TouchController").GetComponent<MyTouchController>().setTouchState("revive");
            }
            reviveTransform.position = revivePosition;
            giveUpTransform.position = giveUpPosition;
        }
        if (isMoveOut && moveTimer < moveTime) {
            moveTimer += Time.deltaTime;
            revivePosition.x -= reviveOutDistance / moveTime * Time.deltaTime;
            giveUpPosition.x -= giveUpOutDistance / moveTime * Time.deltaTime;
            if (moveTimer >= moveTime)
            {
                revivePosition.x = reviveOrigPosition.x+reviveOutDistance;
                giveUpPosition.x = giveUpOrigPosition.x+giveUpOutDistance;
                isMoveOut = false;
                moveTimer = 0;
                countDownAnimation.timeScale = 0;
            }
            reviveTransform.position = revivePosition;
            giveUpTransform.position = giveUpPosition;
        }

        if (reviveTimeOut > 0 && countDownAnimation.timeScale == 1)
        {
            reviveTimeOut -= Time.deltaTime;
            if (reviveTimeOut < 0) {
                GameObject.Find("Canvas").GetComponent<CreatUISence>().ReviveTimeOut();
                GameObject.Find("TouchController").GetComponent<MyTouchController>().setTouchState("wait");
            }
        }

        if (isShining && ShiningTimes>0) {
            m_GoldTextColor.a *= 0.8f;
            GoldNeedText.GetComponent<Text>().color = m_GoldTextColor;
            if (m_GoldTextColor.a < 0.2f)
            {
                m_GoldTextColor.a = 1f;
                ShiningTimes--;
                if (ShiningTimes <= 0) {
                    GoldNeedText.GetComponent<Text>().color = m_OrigGoldColor;
                    ShiningTimes = 3;
                    isShining = false;   
                }
            }
        }

	}

    public void lackOfGold() {
        isShining = true;
        m_GoldTextColor = Color.red;
    }

    public void setAviliable(bool TorF){
        //this.enabled = TorF;
        //this.gameObject.SetActiveRecursively(TorF);

        if (TorF)
        {
            isMoveIn = true;
            shadowTransform.position = shadowOrigPosition;
            GoldNeedText.GetComponent<Text>().text = "" + updateReviveGolds();
        }
        else {
            isMoveOut = true;
            shadowTransform.position = shadowPosition;
        }
    }

    int updateReviveGolds() {
       return GameObject.Find("TouchController").GetComponent<MyTouchController>().getReviveGolds();
    }

}
