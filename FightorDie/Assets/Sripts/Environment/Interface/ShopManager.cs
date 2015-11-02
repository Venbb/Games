using UnityEngine;
using System.Collections;

public class ShopManager : MonoBehaviour {
    private Transform m_transform;
    private bool isShake = false;
    private int shakeFrame = 5;
    private float shakeRate = 15f;
    private float shakeTimer = 0f;
    Quaternion origRotation;
    private bool isHide = false;
    private float changeUnit = 0.25f;
	// Use this for initialization
	void Start () {
        m_transform = this.transform;
        origRotation = m_transform.rotation;
	}
	
	// Update is called once per frame
	void Update () {
        if (isShake) {
            shakeTimer += Time.deltaTime;
            if (shakeFrame >= 0 && shakeTimer>1/shakeRate) {
                shakeTimer = 0;
                m_transform.rotation =Quaternion.Euler(origRotation.x,origRotation.y,origRotation.z+shakeFrame*((shakeFrame%2)*2-1));
                shakeFrame--;
                if (shakeFrame < 0) {
                    m_transform.rotation = origRotation;
                    isShake = false;
                    shakeFrame = 5;
                }
            }
        }

        if (isHide && m_transform.position.y < 26)
        {
            m_transform.position += new Vector3(0, changeUnit, 0);
        }
        else if (!isHide && m_transform.position.y > 22) {
            float PosY = -changeUnit;
            if (m_transform.position.y +PosY < 22)
            {
                PosY = 22 - m_transform.position.y;
            }
            m_transform.position += new Vector3(0, PosY, 0);
        }
	}

    public void shake() {
        isShake = true;
    }

    public void hide(bool TorF) {
        isHide = TorF;
    }
}
