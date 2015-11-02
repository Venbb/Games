using UnityEngine;
using System.Collections;

public class UIchange : MonoBehaviour
{
    private Transform m_transform;
    private Vector2 origScale;
    private bool isChanging = false;
    private bool isRecovering = false;
    private float largeRatio = 1.6f;
    private float changingRatioUnit;
    private float recoveringRatioUnit;
    // Use this for initialization
    void Start()
    {
        m_transform = this.transform;
        origScale = m_transform.localScale;
    }

    // Update is called once per frame
    void Update()
    {
        if (isChanging)
        {
            Vector2 scale = m_transform.localScale;
            if (scale.x < origScale.x*largeRatio)
            {
                scale = m_transform.localScale * (1 + changingRatioUnit * Time.deltaTime);
                if (scale.x >= origScale.x*largeRatio) {
                    scale = origScale * largeRatio;
                    isChanging = false;
                }
                m_transform.localScale = scale;
            }
        }
        if (isRecovering)
        {
            Vector2 scale = m_transform.localScale;
            if (scale.x > origScale.x)
            {
                scale = m_transform.localScale * (1 - recoveringRatioUnit * Time.deltaTime);
                if (scale.x <= origScale.x)
                {
                    scale = origScale;
                    isRecovering = false;
                }
                m_transform.localScale = scale;
            }
        }
    }

    public void startChange(float unit)
    {
        isChanging = true;
        changingRatioUnit = unit;
    }

    public void recoverChange(float unit)
    {
        isRecovering = true;
        recoveringRatioUnit = unit;
    }
}
