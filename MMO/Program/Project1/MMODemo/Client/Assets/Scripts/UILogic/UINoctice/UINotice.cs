using ClientBase.UIFrameWork;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class UINotice : UIBase
{
    public GridLayoutGroup mNoticeListGrid;
    public GameObject mNoticeListElement;
    public Text mNoticeText;
    private void Awake()
    {
        //窗体性质
        CurrentUIType.UIForms_Type = UIFormType.PopUp;
        CurrentUIType.UIForms_ShowMode = UIShowMode.ReverseChange;
        base.CurrentUIType.UIForm_LucencyType = UILucenyType.Translucence;
    }

    #region 接受界面响应
    public void UColseWindow()
    {
        UIManager.Instance.CloseUI(UIConstString.UI_UINOTICE);
    }
    #endregion
}
