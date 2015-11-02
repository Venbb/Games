using UnityEngine;
using System.Collections;

public class progressBarTail : MonoBehaviour {
    public Sprite[] sprites;
    private SpriteRenderer m_renderer;
    private float minPositionX = -4.56f;
    private float maxPositionX = 4.2f;
    private float increasePositionRatio = 0.01f;
    private float increasePositionUnit;
    private float positionXFillter;
    private float nowPositionX;
    private Transform m_transform;
    private bool isSkillLaunch = false;

    public GameObject lightTailObj;
    LightTail lightTailScript;

	// Use this for initialization
	void Start () {
        m_transform = this.transform;
        nowPositionX = minPositionX;
        positionXFillter = minPositionX;
        m_transform.localPosition = new Vector2(nowPositionX,m_transform.localPosition.y);
        increasePositionUnit = increasePositionRatio*(maxPositionX-minPositionX);

        lightTailObj = GameObject.Find("lightTail");
        lightTailScript = lightTailObj.GetComponent<LightTail>();

        m_renderer = this.gameObject.GetComponent<SpriteRenderer>();
        //m_transform.localScale = new Vector2(0, 1);
	}
	
	// Update is called once per frame
	void Update () {
        if (isSkillLaunch) {
            if (positionXFillter < minPositionX) {
                positionXFillter = minPositionX;
                isSkillLaunch = false;
            }
            nowPositionX = positionXFillter;
            m_transform.localPosition = new Vector2(nowPositionX, m_transform.localPosition.y);
        }
        else if (nowPositionX < positionXFillter)
        {
            nowPositionX += increasePositionUnit;
            if (nowPositionX > positionXFillter)
            {
                nowPositionX = positionXFillter;
            }
            m_transform.localPosition = new Vector2(nowPositionX, m_transform.localPosition.y);
        }
	}

    public void increasePositionX(float positionRate){
        positionXFillter += positionRate * (maxPositionX - minPositionX);
        if (positionXFillter > maxPositionX)
        {
            positionXFillter = maxPositionX;
        }
        if (positionRate > 0) {
            int n = Mathf.CeilToInt((positionXFillter - nowPositionX) / increasePositionUnit);
            lightTailScript.shinning(n);
        }
    }

    //public void startScore() {
    //    m_transform.localScale = new Vector2(1, 1);
    //}

    public void launchSkill(){
        isSkillLaunch = true;
        //m_transform.localScale = new Vector2(0, 1);
    }

    public void changeSprite(int index)
    {
        m_renderer.sprite = sprites[index];
    }

    public void resetTail() {
        m_transform.localPosition = new Vector2(minPositionX, m_transform.localPosition.y);
        positionXFillter = minPositionX;
        nowPositionX = minPositionX;
        m_renderer.sprite = sprites[0];
    }
}
