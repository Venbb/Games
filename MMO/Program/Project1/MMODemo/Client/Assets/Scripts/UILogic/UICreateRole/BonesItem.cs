using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class BonesItem : MonoBehaviour {
    public eUMAPlace id = eUMAPlace.UMA_None;
    public Image image;
    public Image selectbg;

    public void SetBonesData(BonesTree bones, bool selected)
    {
        id = bones.place;
        image.overrideSprite = UGUIUtils.Instance.LoadSimpleImageFromResource(string.Format("GameUI/UMA/{0}", bones.BonesIcon));
        if (bones.bEnble)
        {
            image.color = Color.white;
        }
        else
        {
            image.color = Color.gray;
        }
  
        SetSelectState(selected);
    }
    public void SetSelectState(bool selected)
    {
        if (selected)
        {
            selectbg.gameObject.SetActive(true);
        }
        else
        {
            selectbg.gameObject.SetActive(false);
        }
    }
}
