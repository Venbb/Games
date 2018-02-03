using ClientBase.Debuger;
using System.Collections;
using UnityEngine;
using ClientBase.Localization;
using ClientBase.PlayCG;
using ClientBase.UIFrameWork;
using Json;
using ClientNtModule;

public class GameStart : MonoBehaviour {

    public eGameInitStep mInitStep = eGameInitStep.Init_None;
    public eAccountType accountType = eAccountType.AT_Internal;
    public eEditionType editionType = eEditionType.ET_LAN;
    private bool useAppStore = true;
    public const string PLAYERCREATED = "PLAYERHAD";
    [HideInInspector]
    public string textNotice;
    public GameUpdate mGameUpate;
    TableManager table = new TableManager();
    public GameObject roleRoot;
    private void Awake()
    {
        Caching.ClearCache();
    }
    // Use this for initialization
    void Start () {
        DontDestroyOnLoad(this);
        Debuger.EnableLog = true;
        Debuger.EnableSave = true;
        this.Log(Debuger.LogFileDir);
        Application.runInBackground = true;
        ActorManager.Instance.roleRoot = roleRoot;
        this.ChangeStep(eGameInitStep.Init_Language);
    }
    public void ChangeStep(eGameInitStep step)
    {
        mInitStep = step;
        switch (step)
        {
            case eGameInitStep.Init_Language:
                {
                    table.LoadLanguage();
                }
                break;
            case eGameInitStep.Init_Update:
                {
                    //mGameUpate.checkUpdate(this);
                    this.ChangeStep(eGameInitStep.Init_Cfg);
                }
                break;
            case eGameInitStep.Init_Cfg:
                {
                    this.InitServerLstPath();
                    SeverListManager.Instance.GetServerListUrl();
                    table.StartLoad();
                }
                break;
            case eGameInitStep.Init_Movie:
                {
                    if (!PlayerPrefs.HasKey(PLAYERCREATED))
                    {
                        GameObject go = new GameObject("Movie");
                        PlayCG videos = go.AddComponent<PlayCG>();
                        videos.OnVideosOver += JumpCgOver;
                        videos.CGName = "movie.mp4";
                        this.ChangeStep(eGameInitStep.Init_Wait);
                    }
                    else
                    {
                       this.ChangeStep(eGameInitStep.Init_NtModul);
                    }
                }
                break;
            case eGameInitStep.Init_NtModul:
                {
                    this.InitAppOptions();
                }
                break;
            case eGameInitStep.Init_Zero:
                {

                }
                break;
            case eGameInitStep.Init_EnterGame:
                {
                    UIManager.Instance.OpenUI(UIConstString.UI_LOGIN);
                    this.ChangeStep(eGameInitStep.Init_None);
                }
                break;
            case eGameInitStep.Init_CheckPermission:
                {
                    StartCoroutine(checkPermission());
                }
                break;

        }
    }
    void JumpCgOver()
    {
        PlayerPrefs.SetInt(PLAYERCREATED, 1);
        this.ChangeStep(eGameInitStep.Init_CheckPermission);
    }
    private void InitAppOptions()
    {
        GlobalConfig.Instance.useAppStore = useAppStore;
        GameData.Instance.accountType = accountType;
        //平台初始化
        TextAsset appOptionsText = Resources.Load("AppOptions/xblz", typeof(TextAsset)) as TextAsset;
        JsonObject appOptions = new JsonObject(appOptionsText.text);
        appOptions["ModuleType"] = new JsonProperty(GameData.Instance.accountType.ToString());
        if (GameData.Instance.mIsDebug)
        {
            appOptions["DebugMode"] = new JsonProperty(true);
            appOptions["CanMakePayments"] = new JsonProperty(true);
        }
        else
        {
            appOptions["DebugMode"] = new JsonProperty(false);
            appOptions["CanMakePayments"] = new JsonProperty(false);
        }
        GameObject ntModuleObj = new GameObject();
        ntModuleObj.name = "NtModule";
        GameObject.DontDestroyOnLoad(ntModuleObj);
        GameData.Instance.ntModule = ntModuleObj.AddComponent<NtModule>();
        GameData.Instance.ntModule.startup(appOptions.ToString());
        GameData.Instance.ntModule.OnApplicationLoaded += new NtModule.PApplicationLoaded(this.NtModulLoaded);
        GameData.Instance.ntModule.OnLogin += new NtModule.PLogin(GameClient.Instance.MyGameLogin.onLogin);
    }
    public void NtModulLoaded(string val)
    {
    }
    private void InitServerLstPath()
    {
        TextAsset editionText = Resources.Load(string.Format("Edition/{0}", editionType)) as TextAsset;
        JsonObject edtion = new JsonObject(editionText.text);
        SeverListManager.Instance.mhttpUrl = edtion["Url"].Value;
        SeverListManager.Instance.mhttpUrlBak = edtion["BakUrl"].Value;
        SeverListManager.Instance.mServerListPath = edtion["SvrLst"].Value;
        SeverListManager.Instance.mPermissionPath = edtion["Permission"].Value;
    }

    IEnumerator checkPermission()
    {
        string udid = SystemInfo.deviceUniqueIdentifier;
        while (true)
        {
            string url = string.Format("http://{0}?rand={1}&u={2}&t={3}",
                                       SeverListManager.Instance.mPermissionPath,
                                       UnityEngine.Random.value.ToString(),
                                       udid, (int)accountType);
            WWW www = new WWW(url);
            yield return www;

            if (www.error == null)
            {
                bool allSvrClosed = true;
                string tmp = www.text;
                JsonObject obj = new JsonObject(tmp);

                if (obj["CanLogin"].IsTrue)
                {
                    if (GameData.Instance.accountType != eAccountType.AT_Internal)
                    {
                        //						// 检测是否有服务器开放

                        foreach (int key in SeverListManager.Instance.mServerInfoLst.Keys)
                        {
                            if (SeverListManager.Instance.mServerInfoLst[key].bOpen)
                            {
                                allSvrClosed = false;
                                break;
                            }
                        }
                        //						
                        if (allSvrClosed)
                        {
                            this.Log(XLanguage.Instance.GetSting(100001));
                            yield break;
                        }
                    }
                    if (obj["Notice"] != null && obj["Notice"].Value != string.Empty)
                    {
                        textNotice = string.Format("{0}", obj["Notice"].Value);
                        this.Log(this.textNotice);
                    }
                }

                if (obj["Version_TS"] != null)
                {
                    if (obj["Version_TS"].Items.Count == 4)
                    {
                        int curVerNum = GameData.Instance.getVersionNum(GameData.Instance.mVersion);
                        int serVerNum = GameData.Instance.getVersionNum(obj["Version_TS"][0].Value);

                        if (curVerNum != -1 && serVerNum != -1 && curVerNum >= serVerNum)
                        {
                            GameData.Instance.mExamine = true;
#if UNITY_IPHONE
							UIManager.Instance.OpenUI("UIAdvertisement");
#endif

                            ServerInfo serInfo = new ServerInfo();
                            serInfo.nSvrId = int.Parse(obj["Version_TS"][1].Value);
                            serInfo.sName = "西湖相会";
                            serInfo.sServerIp = obj["Version_TS"][2].Value;
                            serInfo.nServerPort = int.Parse(obj["Version_TS"][3].Value);
                            serInfo.sAccServer = "http://120.92.226.91:8089/";
                            serInfo.eState = eServerState.Server_State_Good;
                            serInfo.nNewSvrId = serInfo.nSvrId;
                            serInfo.nSvrIdx = 1;
                            serInfo.bOpen = true;

                            SeverListManager.Instance.mServerLstIdx = serInfo.nSvrId;
                            SeverListManager.Instance.mServerInfoLst.Clear();
                            SeverListManager.Instance.mServerInfoLst[serInfo.nSvrId] = serInfo;
                        }
                    }
                }

                this.ChangeStep(eGameInitStep.Init_NtModul);
                // 跳出循环
                break;
            }
            else
            {
                this.ChangeStep(eGameInitStep.Init_NtModul);
                this.Log(www.error);
                break;
            }
        }
    }
    // Update is called once per frame
    void Update () {
		
	}
    private void FixedUpdate()
    {
        if (mInitStep == eGameInitStep.Init_Language)
        {
            if (table.LoadLanguageOver)
            {
                if (Application.internetReachability == NetworkReachability.NotReachable)
                {
                    this.Log(XLanguage.Instance.GetSting(100000));
                    this.ChangeStep(eGameInitStep.Init_None);
                }
                this.ChangeStep(eGameInitStep.Init_Update);
            }
        } else if (mInitStep == eGameInitStep.Init_Update)
        {

        } else if (mInitStep == eGameInitStep.Init_Cfg)
        {
            if (SeverListManager.Instance.mStep != eServerListStep.s_over)
            {
                SeverListManager.Instance.FixedUpdate();
                return;
            }
            if (table.Count > 0)
            {
                return;
            }
            this.ChangeStep(eGameInitStep.Init_Movie);
        }
        else if (mInitStep == eGameInitStep.Init_NtModul)
        {
            if (GameData.Instance.ntModule.initialized)
            {
                this.ChangeStep(eGameInitStep.Init_EnterGame);
            }
        } else if (mInitStep == eGameInitStep.Init_EnterGame)
        {

        }
    }
}
