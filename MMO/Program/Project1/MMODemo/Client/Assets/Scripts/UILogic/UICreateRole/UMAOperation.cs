using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class UMAOperation : MonoBehaviour {
    public GameObject zidingyi;
    public GameObject moban;
    public TweenPosition tweenPosition;
    public TweenScale tweenScale;
    public GridLayoutGroup group;
    public int Count = 2;
    public void ChangeMobanPage()
    {
        moban.SetActive(true);
        zidingyi.SetActive(false);
        tweenPosition.Play(true);
        tweenScale.Play(true);
        group.gameObject.SetActive(false);
        Count = 3;
    }
    public void ChangeZidingyiPage()
    {
        zidingyi.SetActive(true);
        moban.SetActive(false);
        tweenPosition.Play(false);
        tweenScale.Play(false);
        group.gameObject.SetActive(true);
        Count = 2;
        group.constraintCount = Count;
    }
    public void ChangeFinished()
    {
        group.constraintCount = Count;
    }
}
