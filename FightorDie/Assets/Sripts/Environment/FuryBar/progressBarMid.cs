using UnityEngine;
using System.Collections;

public class progressBarMid : MonoBehaviour {

    public Sprite[] sprites;
    private SpriteRenderer m_renderer;
    private float maxScaleX = 6.4f;
    private float nowSvaleX = 0f;
    private Transform m_transform;

    private float increaseScaleRatio = 0.01f;
    private float increaseScaleUnit;
    private float scaleFillter = 0f;
    private bool isSkillLaunch = false;

	// Use this for initialization
	void Start () {
        m_transform = this.transform;
        m_transform.localScale = new Vector2(nowSvaleX, 1);
        increaseScaleUnit = increaseScaleRatio * maxScaleX;
        m_renderer = this.gameObject.GetComponent<SpriteRenderer>();
	}
	
	// Update is called once per frame
	void Update () {
        if (isSkillLaunch) {
            if (scaleFillter < 0)
            {
                scaleFillter = 0;
                isSkillLaunch = false;
            }
            nowSvaleX = scaleFillter;
            m_transform.localScale = new Vector2(nowSvaleX, 1);
        }
        else if (nowSvaleX < scaleFillter) {
            nowSvaleX += increaseScaleUnit;
            if (nowSvaleX > scaleFillter) {
                nowSvaleX = scaleFillter;
            }
            m_transform.localScale = new Vector2(nowSvaleX, 1);
        }
	}

    public void increaseScaleXRate(float scaleXRate){
        scaleFillter += maxScaleX * scaleXRate;
        if (scaleFillter > maxScaleX)
        {
            scaleFillter = maxScaleX;
        }
    }


    public void launchSkill() {
        isSkillLaunch = true;
    }

    public void changeSprite(int index)
    {
        m_renderer.sprite = sprites[index];
    }

    public void resetMid() {
        m_transform.localScale = new Vector2(0, 1);
        scaleFillter = 0;
        nowSvaleX = 0;
        m_renderer.sprite = sprites[0];
    }

    //public void startScore() { 
    //    //keep invisible
    //}
}
