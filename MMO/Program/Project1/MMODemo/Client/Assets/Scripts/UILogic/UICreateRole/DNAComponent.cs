using System.Collections;
using System.Collections.Generic;
using UMA;
using UMA.CharacterSystem;
using UnityEngine;
using UnityEngine.UI;

public class DNAComponent : MonoBehaviour {
    string _DNAName;
    int _Index;
    UMADnaBase _Owner;   // different DNA 
    DynamicCharacterAvatar _Avatar;
    float _InitialValue;
    public Image huanyuan;
    public Text hytext;
    public Slider ValueSlider;
    public Text upLabel;
    public Text lowLabel;
    public Text mValueLabel;
    public int mMaxValue;
    public float mCurValue;
    public float mInitValue;
    // Use this for initialization
    public void Initialize(string name, int index, UMADnaBase owner, DynamicCharacterAvatar avatar, float currentval, string uptext, string lowtext, int max)
    {
        this.gameObject.SetActive(true);
        _DNAName = name;
        _Index = index;
        _Owner = owner;
        _Avatar = avatar;
        upLabel.text = uptext;
        lowLabel.text = lowtext;
        _InitialValue = currentval;
         
        mMaxValue = max;
        ValueSlider.value = _InitialValue;
        mCurValue = (2 * currentval - 1) * mMaxValue ;
        mInitValue = mCurValue;
        mValueLabel.text = string.Format("{0}", (int)mCurValue);
      
    }

    public void ChangeValue(float value)
    {
        mCurValue = 2 * mMaxValue * value - mMaxValue;
        mValueLabel.text = string.Format("{0}", (int)mCurValue);
        _Owner.SetValue(_Index, value);
        _Avatar.ForceUpdate();
    }
    public void AddChangeValue()
    {
        mCurValue++;
        if (mCurValue > mMaxValue)
        {
            mCurValue = mMaxValue;
        }
        float currentval = (mMaxValue + mCurValue) * 0.5f / mMaxValue;
        ValueSlider.value = currentval;
    }
    public void SubtractChangeValue()
    {
        mCurValue --;
        if (mMaxValue + mCurValue < 0)
        {
            mCurValue = -mMaxValue;
        }
        float currentval = (mMaxValue + mCurValue) * 0.5f / mMaxValue;
        ValueSlider.value = currentval;
    }
    private void Update()
    {
        if (mInitValue != mCurValue && !huanyuan.gameObject.activeSelf)
        {
            huanyuan.gameObject.SetActive(true);
            hytext.color= new Color(255.0f/255.0f,232.0f/255.0f,178.0f/255.0f);
        }
    }
}
