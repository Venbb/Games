using ClientBase.Debuger;
using ClientBase.UIFrameWork;
using ClientNet;
using Json;
using UnityEngine;
using ClientBase.Localization;

public class GameLogin  {

    private string mAccount;
    private string mPassword;
    private HttptLogin mHttpLogin;
    private bool mNeedRelogin = false;
    public eLoginState mLoginState;

    public string MyAccount
    {
        set { mAccount = value; }
        get { return mAccount; }
    }
    public string MyPassword
    {
        set { mPassword = value; }
        get { return mPassword; }
    }

    public GameLogin()
    {
        mAccount = string.Empty;
        mPassword = string.Empty;
        mHttpLogin = new HttptLogin();
        mLoginState = eLoginState.l_none;
    }
    public void StartLogin()
    {
        if (GameData.Instance.identifyCode == "")
            this.StartAccountLogin();
        else
            this.ConnectServer();
    }
    public void FixedUpdate()
    {
        if (mLoginState == eLoginState.l_account_login)
        {
            if (mHttpLogin.mWww != null)
            {
                eHttpLoginResult result = mHttpLogin.IsHttpLoginOver();
                if (result == eHttpLoginResult.ok)
                {
                    this.SelectSvrList();
                }
                else
                {
                    //this.Log(XLanguage.Instance.GetSting(100004));
                    UIManager.Instance.CloseUI(UIConstString.UI_LOGIN);
                    UIManager.Instance.OpenUI(UIConstString.UI_CREATEROLE);
                    mLoginState = eLoginState.l_faild;
                }
            }
        }
        else if (mLoginState == eLoginState.l_connect_server)
        {
            if (GameClient.Instance.MyNetWorkMgr.GetCurNetState() == eNetState.net_working)
            {
                if (mNeedRelogin)
                    this.StartRelogin();
                else
                    this.StartGameLogin();
            }
            else if (GameClient.Instance.MyNetWorkMgr.GetCurNetState() == eNetState.net_dropped)
            {
                this.Log(XLanguage.Instance.GetSting(100000));
                mLoginState = eLoginState.l_faild;
            }
        }
    }

    /// <summary>
    /// 平台登录返回
    /// </summary>
    /// <param name="loginResult"></param>
    public void onLogin(JsonObject loginResult)
    {
        string sessionID = loginResult["SessionID"].Value;
        if (sessionID == "" || sessionID == "Failed")
        {
            AccountLogin();
            GameData.Instance.ntModule.logined(1);
        }
        else
        {
            GameData.Instance.identifyCode = sessionID;
            this.SelectSvrList();
        }
    }
    /// <summary>
    /// 服务器登录返回
    /// </summary>
    /// <param name="login"></param>
    /// <param name="created"></param>
    /// <param name="forbidden"></param>
    /// <param name="extraData"></param>
    /// <param name="sessionID"></param>
    public void OnGameLogin(bool login, bool created, bool forbidden, string extraData, string sessionID)
    {
        if (login)
        {
            if (!created)
            {
                UIManager.Instance.OpenUI(UIConstString.UI_CREATEROLE);
            }
            GameData.Instance.identifyCode = sessionID;
            mNeedRelogin = true;
			GameData.Instance.ntModule.logined(SeverListManager.Instance.mCurServerInfo.nSvrId);
        }
        else
        {
            this.Log("OnGameLogin  faild");
            GameData.Instance.identifyCode = "";
            mNeedRelogin = false;
            this.StartLogin();
        }
    }

    public void OnWaiting(int order)
    {

        if (order > 0)
        {
            this.Log(XLanguage.Instance.GetSting(100005, order));
        }
        else if (order == 0)
        {
            this.Log(XLanguage.Instance.GetSting(100007));
        }
        else
        {
            this.Log(XLanguage.Instance.GetSting(100006));
            GameClient.Instance.CloseClient();
        }
    }

    private void StartAccountLogin()
    {
        SeverListManager.Instance.ReadLastLoginInfo();
        SeverListManager.Instance.SetRecommendServer();
        mLoginState = eLoginState.l_account_login;
        GameData.Instance.mReloginEnterDng = 0;
        GameData.Instance.mShowUILoading = true;
        AccountLogin();
    }
    private void ConnectServer()
    {
        GameClient.Instance.mNeedReconnect = false;
        GameData.Instance.mShowSvrList = false;
        mLoginState = eLoginState.l_connect_server;
        NetConnect(SeverListManager.Instance.mCurServerInfo.sServerIp,
                    SeverListManager.Instance.mCurServerInfo.nServerPort);
    }
    private void NetConnect(string serverIp, int serverPort)
    {
        GameClient.Instance.MyNetWorkMgr.IPAddress = serverIp;
        GameClient.Instance.MyNetWorkMgr.Port = serverPort;
        GameClient.Instance.MyNetWorkMgr.StartNetWork();
    }
    private void SelectSvrList()
    {
        if (GameData.Instance.mShowSvrList)
        {
            UIManager.Instance.CloseUI(UIConstString.UI_LOGIN);
            UIManager.Instance.OpenUI(UIConstString.UI_CREATEROLE);
            //UIManager.Instance.OpenUI(UIConstString.UI_SEVERLIST);
        }
        else
            ConnectServer();
    }
    private void StartRelogin()
    {
        mLoginState = eLoginState.l_game_login;
        ProtocolFuns.StartReloginPro();
    }
    private void StartGameLogin()
    {
        mLoginState = eLoginState.l_game_login;
        ProtocolFuns.GameLoginPro(getDeviceDescription());
    }
    private string getDeviceDescription()
    {
        JsonObject obj = new JsonObject();

        switch (Application.platform)
        {
            case RuntimePlatform.IPhonePlayer:
                {
                    obj["Platform"] = new JsonProperty(0);
                }
                break;

            case RuntimePlatform.Android:
                {
                    obj["Platform"] = new JsonProperty(1);
                }
                break;

            default:
                {
                    obj["Platform"] = new JsonProperty(-1);
                }
                break;
        }

        obj["RegisterChannel"] = new JsonProperty((int)GameData.Instance.accountType);
        obj["TelecomOper"] = new JsonProperty("");
        obj["Network"] = new JsonProperty("");
        obj["ClientVersion"] = new JsonProperty(GameData.Instance.mVersion);
        obj["SystemSoftware"] = new JsonProperty(SystemInfo.operatingSystem);
        obj["SystemHardware"] = new JsonProperty(SystemInfo.deviceModel);
        obj["ScreenWidth"] = new JsonProperty(Screen.currentResolution.width);
        obj["ScreenHeight"] = new JsonProperty(Screen.currentResolution.height);
        obj["Density"] = new JsonProperty(Screen.dpi);
        obj["CpuHardware"] = new JsonProperty(SystemInfo.processorType);
        obj["Memory"] = new JsonProperty(SystemInfo.systemMemorySize);
        obj["GLRender"] = new JsonProperty(SystemInfo.graphicsDeviceVendor);
        obj["GLVersion"] = new JsonProperty(SystemInfo.graphicsDeviceVersion);
        obj["DeviceId"] = new JsonProperty(SystemInfo.deviceUniqueIdentifier);
        obj["GraphicsMemory"] = new JsonProperty(SystemInfo.graphicsMemorySize);
        obj["AppID"] = new JsonProperty("");
        return obj.ToString();
    }
    private void AccountLogin()
    {
        if (GameData.Instance.accountType == eAccountType.AT_Internal)
        {
            mHttpLogin.AccountLogin(GameData.Instance.accountType, SeverListManager.Instance.mCurServerInfo.sAccServer, mAccount, mPassword);
        }
        else
        {
            GameData.Instance.ntModule.login("{}");
        }
    }
}
