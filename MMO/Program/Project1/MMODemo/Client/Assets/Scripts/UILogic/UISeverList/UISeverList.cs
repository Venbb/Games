using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using ClientBase.UIFrameWork;
using ClientBase.Debuger;
using ClientBase.Localization;
using UnityEngine.UI;

public class UISeverList : UIBase
{
    public GridLayoutGroup mServerListGrid;
    public GameObject mServerListElement;
    public GridLayoutGroup mServerRankGrid;
    public GameObject mServerRankElement;
    private List<GameObject> mRankObjList = new List<GameObject>();
    private List<GameObject> mSeverObjList = new List<GameObject>();
    private int curSelcet = 0;
    private UISeverRank curSelectRank;
    private void Awake()
    {
        //窗体性质
        CurrentUIType.UIForms_Type = UIFormType.PopUp;  
        CurrentUIType.UIForms_ShowMode = UIShowMode.ReverseChange;
        base.CurrentUIType.UIForm_LucencyType = UILucenyType.Translucence;
    }
    public override void Display()
    {
        base.Display();
        InitSeverList();
        InitSeverRank();
    }
    private void InitSeverRank()
    {
        int count = mRankObjList.Count;
        int index = 0;
        UISeverRank item = null;
        foreach (int idx in SeverListManager.Instance.mSeverRank)
        {
            if (index < count)
            {
                item = mRankObjList[index].GetComponent<UISeverRank>();
                item.gameObject.SetActive(true);
                if (idx == curSelcet)
                {
                    curSelectRank = item;
                    item.SetRankData(idx, true);
                }
                else
                {
                    item.SetRankData(idx, false);
                }
            }
            else
            {
                GameObject ret = GameObject.Instantiate(mServerRankElement) as GameObject;
                ret.transform.SetParent(mServerRankGrid.transform);
                ret.transform.localScale = Vector3.one;
                item = ret.GetComponent<UISeverRank>();
                item.gameObject.SetActive(true);
                if (idx == curSelcet)
                {
                    curSelectRank = item;
                    item.SetRankData(idx, true);
                }
                else
                {
                    item.SetRankData(idx, false);
                }
               
                mRankObjList.Add(ret);
            }
            index++;
        }
        if (index < count)
        {
            for (int i = index; i < count; i++)
            {
                mRankObjList[i].SetActive(false);
            }
        }
        mServerRankGrid.useGUILayout = true;
    }
    private void InitSeverList()
    {
        if (SeverListManager.Instance.mSeverDict.ContainsKey(GlobalConfig.Instance.ownindex) && SeverListManager.Instance.mSeverDict[GlobalConfig.Instance.ownindex].Count > 0)
        {
            curSelcet = GlobalConfig.Instance.ownindex;
            int count = mSeverObjList.Count;
            int index = 0;
            UISeverItem item = null;
            foreach (int idx in SeverListManager.Instance.mSeverDict[GlobalConfig.Instance.ownindex])
            {
                if (SeverListManager.Instance.mServerInfoLst.ContainsKey(idx))
                {
                    if (index < count)
                    {
                        item = mSeverObjList[index].GetComponent<UISeverItem>();
                        item.gameObject.SetActive(true);
                        item.SetRankData(SeverListManager.Instance.mServerInfoLst[idx]);
                    }
                    else
                    {
                        GameObject ret = GameObject.Instantiate(mServerListElement) as GameObject;
                        ret.transform.SetParent(mServerListGrid.transform);
                        ret.transform.localScale = Vector3.one;
                        item = ret.GetComponent<UISeverItem>();
                        item.gameObject.SetActive(true);
                        item.SetRankData(SeverListManager.Instance.mServerInfoLst[idx]);
                        mSeverObjList.Add(ret);
                    }
                }
                index++;
            }
            if (index < count)
            {
                for (int i = index; i < count; i++)
                {
                    mSeverObjList[i].SetActive(false);
                }
            }
            mServerListGrid.useGUILayout = true;
        }
        else if (SeverListManager.Instance.mSeverDict.ContainsKey(GlobalConfig.Instance.recommendindex) && SeverListManager.Instance.mSeverDict[GlobalConfig.Instance.recommendindex].Count > 0)
        {
            curSelcet = GlobalConfig.Instance.recommendindex;
            int count = mSeverObjList.Count;
            int index = 0;
            UISeverItem item = null;
            foreach (int idx in SeverListManager.Instance.mSeverDict[GlobalConfig.Instance.recommendindex])
            {
                if (SeverListManager.Instance.mServerInfoLst.ContainsKey(idx))
                {
                    if (index < count)
                    {
                        item = mSeverObjList[index].GetComponent<UISeverItem>();
                        item.gameObject.SetActive(true);
                        item.SetRankData(SeverListManager.Instance.mServerInfoLst[idx]);
                    }
                    else
                    {
                        GameObject ret = GameObject.Instantiate(mServerListElement) as GameObject;
                        ret.transform.SetParent(mServerListGrid.transform);
                        ret.transform.localScale = Vector3.one;
                        item = ret.GetComponent<UISeverItem>();
                        item.gameObject.SetActive(true);
                        item.SetRankData(SeverListManager.Instance.mServerInfoLst[idx]);
                        mSeverObjList.Add(ret);
                    }
                }
                index++;
            }
            if (index < count)
            {
                for (int i = index; i < count; i++)
                {
                    mSeverObjList[i].SetActive(false);
                }
            }
            mServerListGrid.useGUILayout = true;
        }
        else
        {
            int id = 0;
            foreach (int idx in SeverListManager.Instance.mSeverRank)
            {
                if (idx != GlobalConfig.Instance.recommendindex && idx != GlobalConfig.Instance.ownindex)
                {
                    if (idx > id)
                    {
                        id = idx;
                    }
                }
            }
            if (SeverListManager.Instance.mSeverDict.ContainsKey(id) && SeverListManager.Instance.mSeverDict[id].Count > 0)
            {
                curSelcet = id;
                int count = mSeverObjList.Count;
                int index = 0;
                UISeverItem item = null;
                foreach (int idx in SeverListManager.Instance.mSeverDict[id])
                {
                    if (SeverListManager.Instance.mServerInfoLst.ContainsKey(idx))
                    {
                        if (index < count)
                        {
                            item = mSeverObjList[index].GetComponent<UISeverItem>();
                            item.gameObject.SetActive(true);
                            item.SetRankData(SeverListManager.Instance.mServerInfoLst[idx]);
                        }
                        else
                        {
                            GameObject ret = GameObject.Instantiate(mServerListElement) as GameObject;
                            ret.transform.SetParent(mServerListGrid.transform);
                            ret.transform.localScale = Vector3.one;
                            item = ret.GetComponent<UISeverItem>();
                            item.gameObject.SetActive(true);
                            item.SetRankData(SeverListManager.Instance.mServerInfoLst[idx]);
                            mSeverObjList.Add(ret);
                        }
                    }
                    index ++;
                }
                if (index < count)
                {
                    for (int i = index; i < count; i++)
                    {
                        mSeverObjList[i].SetActive(false);
                    }
                }
                mServerListGrid.useGUILayout = true;
            }
        }
    }
    public void SelectRank(UISeverRank obj)
    {
        curSelectRank.SetSelectState(false);
        obj.SetSelectState(true);
        curSelectRank = obj;
        curSelcet = obj.id;
        int count = mSeverObjList.Count;
        int index = 0;
        UISeverItem item = null;
        if (SeverListManager.Instance.mSeverDict.ContainsKey(curSelcet))
        {
            foreach (int idx in SeverListManager.Instance.mSeverDict[curSelcet])
            {
                if (SeverListManager.Instance.mServerInfoLst.ContainsKey(idx))
                {
                    if (index < count)
                    {
                        item = mSeverObjList[index].GetComponent<UISeverItem>();
                        item.gameObject.SetActive(true);
                        item.SetRankData(SeverListManager.Instance.mServerInfoLst[idx]);
                    }
                    else
                    {
                        GameObject ret = GameObject.Instantiate(mServerListElement) as GameObject;
                        ret.transform.SetParent(mServerListGrid.transform);
                        ret.transform.localScale = Vector3.one;
                        item = ret.GetComponent<UISeverItem>();
                        item.gameObject.SetActive(true);
                        item.SetRankData(SeverListManager.Instance.mServerInfoLst[idx]);
                        mSeverObjList.Add(ret);
                    }
                }
                index++;
            }
            if (index < count)
            {
                for (int i = index; i < count; i++)
                {
                    mSeverObjList[i].SetActive(false);
                }
            }
        }
        else
        {
            for (int i = 0; i < count; i++)
            {
                mSeverObjList[i].SetActive(false);
            }
        }
        mServerListGrid.useGUILayout = true;
    }
    #region 接受界面响应
    public void UServerSelected(UISeverItem obj)
    {
        int idx = obj.idx;
        if (SeverListManager.Instance.mServerInfoLst.ContainsKey(idx))
            SeverListManager.Instance.mServerLstIdx = idx;
        else
            SeverListManager.Instance.mServerLstIdx = 0;
        SeverListManager.Instance.SetRecommendServer();
        UIManager.Instance.CloseUI(UIConstString.UI_SEVERLIST);
    }
    public void USelectRank(UISeverRank obj)
    {
        SelectRank(obj);
    }
    public void UColseWindow()
    {
        UIManager.Instance.CloseUI(UIConstString.UI_SEVERLIST);
    }
    public void UOpenSelectPage()
    {
        //ServerItems();
    }
    #endregion
}
