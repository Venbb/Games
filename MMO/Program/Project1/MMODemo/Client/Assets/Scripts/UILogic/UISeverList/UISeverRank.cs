using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
public class UISeverRank : MonoBehaviour {
    public int id;
    public Text text;
    public Image selectbg;
    public void SetRankData(int index, bool selected)
    {
        id = index;
        if (index == GlobalConfig.Instance.ownindex)
        {
            text.text = string.Format("我的服务器");
        }
        else if (index == GlobalConfig.Instance.recommendindex)
        {
            text.text = string.Format("推荐");
        }
        else
        {
            text.text = string.Format("{0}-{1}服", index + 1, index + 10);
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
