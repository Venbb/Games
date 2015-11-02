using UnityEngine;
using System.Collections;

public class ComboManager : MonoBehaviour {
    public float keepTime = 1f;
    Transform m_transform;
    public GameObject comboHeadObj;
    ComboHead comboHeadScript;
    public GameObject comboCountObj;
    ComboCount comboCountScript;
    private Vector2 origScale;
    private float moveDistance = 50f;
    private Vector3 movePositionUnit = new Vector3(0, 0, 0);
    private float moveTime = 0.1f;
    private float moveTimer = 0f;

	// Use this for initialization
	void Start () {
        m_transform = this.transform;
        comboHeadScript = comboHeadObj.GetComponent<ComboHead>();
        comboCountScript = comboCountObj.GetComponent<ComboCount>();
        origScale = m_transform.localScale;
	}
	
	// Update is called once per frame
	void Update () {
        if (moveTimer>0) { 
            moveTimer -= Time.deltaTime;
            m_transform.localPosition += movePositionUnit*Time.deltaTime;
        }
	}

    public void setComboPosition(Vector2 m_position,float scaleUnit,string Direction) {
        moveTimer = moveTime;
        setMovePosition(Direction);
        m_transform.localScale = origScale * scaleUnit;
        m_transform.localPosition = m_position*85*scaleUnit;
        comboCountScript.showCombo();
        comboHeadScript.showCombo();
    }

    private void setMovePosition(string Direction) {
        float distancePerTime = moveDistance / moveTime; 
        switch (Direction)
        {
            case "Left":
                movePositionUnit.x = -distancePerTime;
                movePositionUnit.y = 0;
                break;
            case "Right":
                movePositionUnit.x = distancePerTime;
                movePositionUnit.y = 0;
                break;
            case "Up":
                movePositionUnit.y = distancePerTime;
                movePositionUnit.x = 0;
                break;
            case "Down":
                movePositionUnit.y = -distancePerTime;
                movePositionUnit.x = 0;
                break;
            default: break;
        }
    }

}
