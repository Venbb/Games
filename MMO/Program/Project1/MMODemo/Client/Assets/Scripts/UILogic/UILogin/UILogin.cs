using ClientBase.UIFrameWork;
using UnityEngine;
using UnityEngine.UI;
public class UILogin : UIBase
{
    public Image bg;
    public GameObject page1;
    public GameObject page2;
    public GameObject page3;
    public InputField mInputAccount;
    public InputField mInputPwd;
    public UISeverItem mCurSeverItem;
    public UISeverItem mCurSeverItem1;
    public override void Display()
    {
        base.Display();
        mCurSeverItem.SetRankData(SeverListManager.Instance.mCurServerInfo);
        mCurSeverItem1.SetRankData(SeverListManager.Instance.mCurServerInfo);
    }

    #region 接受界面响应
    public void UShowNotice()
    {
        //显示公告界面
        UIManager.Instance.OpenUI(UIConstString.UI_UINOTICE);
    }
    public void UTouristLogin()
    {
        //游客登录
        page1.SetActive(false);
        page3.SetActive(true);
    }
    public void UAccountLogin()
    {
        //账号登录
        page1.SetActive(false);
        page2.SetActive(true);
    }
    public void URegister()
    {
        //注册账号

    }
    public void USeletSever()
    {
        //打开选择服务器界面
        UIManager.Instance.OpenUI(UIConstString.UI_SEVERLIST);
    }
    public void UStartLogin()
    {
        GameClient.Instance.MyGameLogin.MyAccount = mInputAccount.text;
        GameClient.Instance.MyGameLogin.MyPassword = mInputPwd.text;
        GameClient.Instance.MyGameLogin.StartLogin();
    }
    public void UTouristReturn()
    {
        //游客界面返回
        page1.SetActive(true);
        page3.SetActive(false);
    }
    #endregion
}
