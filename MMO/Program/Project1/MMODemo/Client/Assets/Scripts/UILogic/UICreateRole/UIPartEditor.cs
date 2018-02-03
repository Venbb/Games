using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using ClientBase.Debuger;

public class UIPartEditor : TreeViewItem
{
    public GameObject mContextButton;
    public Image mTreeViewImage;
    public GameObject mTextButton;
    public Text mTreeViewText;
    public GameObject mSelectImage2;
    public GameObject mTreeViewLine;

    /// <summary>
    /// 初始化树形控件里的内容
    /// </summary>
    public override void InitItemData(TreeViewData viewData)
    {
        base.InitItemData(viewData);
        mTreeViewText.text = viewData.Name;

        if (viewData.ParentID == -1)
        {
            mContextButton.SetActive(true);
            mTreeViewImage.gameObject.SetActive(true);
            mTextButton.gameObject.SetActive(false);
            mSelectImage2.gameObject.SetActive(false);
            mTreeViewLine.SetActive(false);
            mTreeViewImage.overrideSprite = UGUIUtils.Instance.LoadSimpleImageFromResource(string.Format("GameUI/UMA/{0}", viewData.Name));
            mTreeViewImage.SetNativeSize();
        }
        else
        {
            mContextButton.SetActive(false);
            mTreeViewImage.gameObject.SetActive(false);
            mTextButton.gameObject.SetActive(true);
            mSelectImage2.gameObject.SetActive(false);
            mTreeViewLine.SetActive(true);
        }
    }
    public override void ContextButtonClick()//展示子项，父节点才有
    {
        base.ContextButtonClick();
        if (!IsExpanding)
        {
            mContextButton.GetComponent<Image>().overrideSprite = UGUIUtils.Instance.LoadSimpleImageFromResource(string.Format("GameUI/UMA/{0}", "bg_weixuanzhong_dk"));
        }
        else
        {
            mContextButton.GetComponent<Image>().overrideSprite = UGUIUtils.Instance.LoadSimpleImageFromResource(string.Format("GameUI/UMA/{0}", "bg_xuanzhong_dk"));
        }
    }
}
