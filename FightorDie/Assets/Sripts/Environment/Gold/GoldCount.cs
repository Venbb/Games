using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class GoldCount : MonoBehaviour {
    private Transform m_transform;
    public GameObject m_goldCount;
    private Text m_goldCountText;
    public GameObject m_goldImage;
    private Transform m_goldImageTransform;
    private Vector3 m_origScale;
    private Quaternion origRotation;
    private Quaternion m_rotation;
    private bool isMoveIn = true;
    private bool isMoveOut = false;
    private int rotationAng = -90;
    private float waitTime = 0.5f;
    private int m_golds;
    private bool isAddGold = false;
	// Use this for initialization
	void Start () {
        m_transform = this.transform;
        origRotation = m_transform.localRotation;
        m_rotation = Quaternion.Euler(0, 0, rotationAng);
        m_transform.localRotation = m_rotation;
        m_golds = PlayerPrefs.GetInt("PlayerGold", 500);
        m_goldCountText = m_goldCount.GetComponent<Text>();
        m_goldCountText.text = m_golds + "";
        m_goldImageTransform = m_goldImage.transform;
        m_origScale = m_goldImageTransform.localScale;
	}
	
	// Update is called once per frame
	void Update () {
        if (isMoveIn) {
            waitTime -= Time.deltaTime;
            if (m_rotation.z < 0 && waitTime < 0)
            {
                m_rotation.z += 0.015f;
                if (m_rotation.z >= 0) {
                    m_rotation.z = 0;
                    isMoveIn = false;
                }
                m_transform.localRotation = m_rotation;
            }
        }
        if (isAddGold || m_goldImageTransform.localScale.x > m_origScale.x)
        {
            if (isAddGold)
            {
                m_goldImageTransform.localScale *= 1.06f;

                if (m_goldImageTransform.localScale.x > 1.4f * m_origScale.x)
                {
                    isAddGold = false;
                }
            }
            else {
                m_goldImageTransform.localScale /= 1.06f;
                if (m_goldImageTransform.localScale.x <= m_origScale.x)
                {
                    m_goldImageTransform.localScale = m_origScale;
                }
            }

        }
	}

    public void moveIn(){
        isMoveIn = true;
    }

    public void addGold() {
        m_golds++;
        isAddGold = true;
        m_goldCountText.text = m_golds + "";
        //isMoveIn = true;
        //m_rotation.z -= 0.05f;
        //m_transform.localRotation = m_rotation;
    }

    public void costGold(int costs) {
        m_golds -= costs;
        isAddGold = true;
        m_goldCountText.text = m_golds + "";
    }
}
