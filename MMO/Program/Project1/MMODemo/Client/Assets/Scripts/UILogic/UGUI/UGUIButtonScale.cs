using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class UGUIButtonScale : EventTrigger
{
    public Vector3 pressed = new Vector3(1.05f, 1.05f, 1.05f);
    Vector3 mScale;
    public Transform tweenTarget;
    bool mStarted = false;
    public float duration = 0.2f;
    void Start()
    {
        if (!mStarted)
        {
            mStarted = true;
            if (tweenTarget == null) tweenTarget = transform;
            mScale = tweenTarget.localScale;
        }
    }
    public override void OnPointerDown(PointerEventData eventData)
    {
        if (enabled)
        {
            if (!mStarted) Start();
            TweenScale.Begin(tweenTarget.gameObject, duration, Vector3.Scale(mScale, pressed)).method = UITweener.Method.EaseInOut;
        }
    }
    public override void OnPointerUp(PointerEventData eventData)
    {
        if (enabled)
        {
            if (!mStarted) Start();
            TweenScale.Begin(tweenTarget.gameObject, duration,mScale).method = UITweener.Method.EaseInOut;
        }
    }
}
