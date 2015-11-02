using UnityEngine;
using System.Collections;

public class CameraChange : MonoBehaviour {
    Camera m_camera;
    private float origSize;
    private bool isChanging = false;
    private bool isRecovering = false;
    private float largeRatio = 1.25f;
    private float changingTime = 0.833f;
    private float changingRatioUnit ;
    private float recoveringRatioUnit ;
    private MyTouchController m_TouchController;
    //GameObject UIObj;
    //UIchange UIChangeScript;

    GameObject bgAnimationObj;
    SkeletonAnimation bgAnimationScript;

    public ScoreManager scoreManagerScript;

	// Use this for initialization
	void Start () {
        m_camera = this.GetComponent<Camera>();
        origSize = m_camera.orthographicSize;
        m_camera.orthographicSize = origSize * largeRatio;
        //UIObj = GameObject.Find("UI");
        //UIChangeScript = UIObj.GetComponent<UIchange>();

        bgAnimationObj = GameObject.Find("bgAnimation");
        bgAnimationScript = bgAnimationObj.GetComponent<SkeletonAnimation>();

        bgAnimationScript.state.End += state_End;

        scoreManagerScript = GameObject.Find("Kill").GetComponent<ScoreManager>();
        m_TouchController = GameObject.Find("TouchController").GetComponent<MyTouchController>();
	}

    void state_End(Spine.AnimationState state, int trackIndex)
    {
        if (state.GetCurrent(trackIndex) + "" == "zoom_out2")
        {
            bgAnimationScript.state.SetAnimation(5, "stay", false);
            GameObject.Find("EnemyCreator").GetComponent<EnemyManager>().isPause = false;
            m_TouchController.setTouchState("fight");
        }
    }
	
	// Update is called once per frame
	void Update () {
        if (isChanging) {
            float size = m_camera.orthographicSize;
            if (size < origSize * largeRatio)
            {
                m_camera.orthographicSize += m_camera.orthographicSize*changingRatioUnit * Time.deltaTime;
                if (m_camera.orthographicSize > origSize * largeRatio)
                {
                    m_camera.orthographicSize = origSize * largeRatio;
                    isChanging = false;
                }
            }
        }
        if (isRecovering) {
            float size = m_camera.orthographicSize;
            if (size > origSize)
            {
                m_camera.orthographicSize -= m_camera.orthographicSize * recoveringRatioUnit * Time.deltaTime;
                if (m_camera.orthographicSize < origSize) {
                    m_camera.orthographicSize = origSize;
                    scoreManagerScript.changeSize(false);
                    isRecovering = false;
                }
            } 
        }
	}

    public void startChange() {
        scoreManagerScript.changeSize(true);
        isChanging = true;
        changingRatioUnit = (largeRatio - 1f) / changingTime;
        //UIChangeScript.startChange(changingRatioUnit);
        bgAnimationScript.state.SetAnimation(2,"zoom_out",false);
    }

    public void recoverChange() {
        isRecovering = true;
        recoveringRatioUnit = (1f - 1f / largeRatio) / changingTime;
        //UIChangeScript.recoverChange(recoveringRatioUnit);
        bgAnimationScript.state.SetAnimation(1, "zoom_in", false);
    }

    public void startGame() {
        isRecovering = true;
        recoveringRatioUnit = (1f - 1f / largeRatio) / changingTime / 2;
        bgAnimationScript.state.SetAnimation(4, "zoom_out2", false);
    }

    public void returnToInterface() {
        isChanging = true;
        changingRatioUnit = (largeRatio - 1f) / changingTime / 2;
        bgAnimationScript.state.SetAnimation(3, "zoom_in2", false);
    }
}
