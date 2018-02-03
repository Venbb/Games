using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class PropItem : MonoBehaviour {
    public GameObject mSelect;
    public GameObject mEnble;
    public UGUIButtonScale mScale;
    public Text mText;
    public ePropType property = ePropType.Position;
    public bool mOnEnble = true;
    public void OnSelected(bool bSelected)
    {
        if (bSelected)
        {
            mSelect.SetActive(true);
            mText.color = new Color(255.0f/255.0f,232.0f/255.0f,178.0f/255.0f);
        }
        else
        {
            mSelect.SetActive(false);
            mText.color = new Color(1, 1, 1);
        }
    }
    public void OnSetEnble(bool bEnble)
    {
        if (bEnble)
        {
            mScale.enabled = true;
            mEnble.SetActive(false);
            mOnEnble = true;
        }
        else
        {
            mScale.enabled = false;
            mEnble.SetActive(true);
            mOnEnble = false;
        }
    }
}
